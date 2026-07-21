const PUSHALERT_SCRIPT_ID = "pushalert-script";
const PUSHALERT_LOADED_FLAG = "__trainHighPushAlertLoaded";

const getPushAlertScriptUrl = () => {
  const configuredUrl = process.env.REACT_APP_PUSHALERT_SCRIPT_URL;
  const configuredId = process.env.REACT_APP_PUSHALERT_WEBSITE_ID;

  if (configuredUrl) return configuredUrl.replace(/^['"]|['"]$/g, "");
  if (!configuredId) return "";

  const cleanId = configuredId
    .replace(/^['"]|['"]$/g, "")
    .replace(/^https:\/\/cdn\.pushalert\.co\/integrate_/, "")
    .replace(/^integrate_/, "")
    .replace(/^unified_/, "")
    .replace(/\.js$/, "");

  return `https://cdn.pushalert.co/integrate_${cleanId}.js`;
};

const hasPushAlertScript = () =>
  Boolean(
    document.getElementById(PUSHALERT_SCRIPT_ID) ||
      document.querySelector('script[src*="cdn.pushalert.co/integrate_"]'),
  );

export const initPushAlert = () => {
  if (typeof window === "undefined") return;

  const scriptUrl = getPushAlertScriptUrl();
  if (!scriptUrl) return;
  if (window[PUSHALERT_LOADED_FLAG] || hasPushAlertScript()) return;

  window[PUSHALERT_LOADED_FLAG] = true;
  window.PushAlertCo = window.PushAlertCo || [];

  const script = document.createElement("script");
  script.id = PUSHALERT_SCRIPT_ID;
  script.async = true;
  script.src = scriptUrl;
  script.onerror = () => {
    window[PUSHALERT_LOADED_FLAG] = false;
  };
  document.head.appendChild(script);
};
