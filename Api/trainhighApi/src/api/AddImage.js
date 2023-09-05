var fs = require(`fs`);

module.exports = (request, response, next) =>
  setTimeout(async () => {
    var file = request.files.file;
    var foldername = request.body.foldername;
    var filename = request.body.filename;
    var bitmap = fs.readFileSync(file.path);
    console.log(filename.split(".").slice(0, -1).join("."));

    try {
      //   fs.writeFile(
      // "/home/trainhighgym/public_html/images/" +
      //   foldername + "/" +
      //   filename,
      // bitmap,
      // function (err) {
      fs.writeFile("./" + filename + ".png", bitmap, function (err) {
        if (err) {
          response.status(404).json({
            data: err.message,
          });
        } else {
          response.status(200).json({
            Message:
              "{ status = Uploaded, file = " +
              filename +
              ", filename = " +
              filename +
              ", foldername = " +
              foldername +
              " }",
          });
        }
      });
    } catch {
      response.status(404).json({
        data: "error",
      });
    }
  });
