const fs = require("fs");
const http = require("http");
const path = require("path");
const puppeteer = require("puppeteer");

const buildDirectory = path.resolve(process.env.BUILD_PATH || "build");
const sitemapPath = path.resolve("public/sitemap.xml");
const siteOrigin = "https://trainhighgym.com";
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function getRoutes() {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const locations = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)];
  const sitemapRoutes = locations.map(([, value]) => {
    const url = new URL(value.trim());
    if (url.origin !== siteOrigin) {
      throw new Error(`Unexpected sitemap origin: ${url.origin}`);
    }
    return url.pathname;
  });

  // Prerender the pages with deliberate page-specific SEO metadata. Other
  // routes can remain regular React routes until they receive unique metadata.
  const routes = ["/", "/locations/janakpuri", "/locations/rajouri-garden"];
  const missingRoutes = routes.filter((route) => !sitemapRoutes.includes(route));
  if (missingRoutes.length) {
    throw new Error(`Add prerender routes to public/sitemap.xml: ${missingRoutes.join(", ")}`);
  }

  return routes;
}

function findStaticFile(requestPath) {
  const decodedPath = decodeURIComponent(requestPath.split("?")[0]);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const candidate = path.resolve(buildDirectory, relativePath);

  if (candidate !== buildDirectory && !candidate.startsWith(`${buildDirectory}${path.sep}`)) {
    return null;
  }

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return candidate;
  }

  const directoryIndex = path.join(candidate, "index.html");
  if (fs.existsSync(directoryIndex) && fs.statSync(directoryIndex).isFile()) {
    return directoryIndex;
  }

  return path.join(buildDirectory, "index.html");
}

function createStaticServer() {
  return http.createServer((request, response) => {
    let filePath;
    try {
      filePath = findStaticFile(request.url || "/");
    } catch {
      response.writeHead(400).end("Bad request");
      return;
    }

    if (!filePath || !fs.existsSync(filePath)) {
      response.writeHead(404).end("Build output not found");
      return;
    }

    response.setHeader(
      "Content-Type",
      mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    );
    fs.createReadStream(filePath).pipe(response);
  });
}

async function getBrowserExecutable() {
  const configuredPath = process.env.PUPPETEER_EXECUTABLE_PATH;
  const candidates = [
    configuredPath,
    process.platform === "win32"
      ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
      : null,
    process.platform === "win32"
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : null,
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
  ].filter(Boolean);

  const installedExecutable = candidates.find((candidate) => fs.existsSync(candidate));
  if (installedExecutable) return installedExecutable;

  const downloadedExecutable = await puppeteer.executablePath().catch(() => null);
  if (downloadedExecutable && fs.existsSync(downloadedExecutable)) {
    return downloadedExecutable;
  }

  throw new Error(
    "A Chromium browser is required for prerendering. Install Chrome/Chromium or set PUPPETEER_EXECUTABLE_PATH.",
  );
}

function outputPathForRoute(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, "");
  const outputPath = path.resolve(
    buildDirectory,
    relativeRoute ? path.join(relativeRoute, "index.html") : "index.html",
  );
  if (outputPath !== buildDirectory && !outputPath.startsWith(`${buildDirectory}${path.sep}`)) {
    throw new Error(`Invalid prerender route: ${route}`);
  }
  return outputPath;
}

async function main() {
  const indexPath = path.join(buildDirectory, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Build output not found at ${indexPath}. Run the React build first.`);
  }

  const routes = getRoutes();
  const executablePath = await getBrowserExecutable();
  const server = createStaticServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  let browser;

  try {
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    for (const route of routes) {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(60000);
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(
        () => document.querySelector("#root")?.children.length > 0,
        { timeout: 60000 },
      );
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const html = await page.evaluate(() => `<!doctype html>\n${document.documentElement.outerHTML}`);
      const title = await page.title();
      const canonical = await page.$eval(
        'link[rel="canonical"]',
        (element) => element.href,
      ).catch(() => "");
      const rootText = await page.$eval("#root", (root) => root.innerText.trim());
      const expectedCanonical = `${siteOrigin}${route === "/" ? "/" : route}`;
      if (!title || !rootText || canonical !== expectedCanonical) {
        throw new Error(
          `Prerender validation failed for ${route} (title: ${Boolean(title)}, canonical: ${canonical || "missing"}, content: ${Boolean(rootText)})`,
        );
      }

      const outputPath = outputPathForRoute(route);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, html, "utf8");
      console.log(`Prerendered ${route} -> ${path.relative(process.cwd(), outputPath)}`);
      await page.close();
    }
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error("Prerender failed:", error);
  process.exitCode = 1;
});
