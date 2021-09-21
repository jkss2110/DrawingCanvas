var express = require("express");
var router = express.Router();
var request = require("request");


router.post("/", function (req, res) {
var fileContent = req.body.file;
  request.post(
    {
      url: "https://api.remove.bg/v1.0/removebg",
      formData: {
        image_file_b64: fileContent,
        size: "auto",
      },
      headers: {
        "X-Api-Key": "i8rvgKtsrTNqvVaCLwH9vkCH",
      },
      encoding: null,
    },
    function (error, response, body) {
      if (error) return console.error("Request failed:", error);
      if (response.statusCode !== 200){
        res.send(console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        ));
      }else{
        let raw = body.toString('base64');
        raw = "data:" + response.headers["content-type"] + ";base64,"+raw;
        var fileNoImage = {
          fileContent: raw
        };
        console.log("success");
        res.send(fileNoImage);
      }

      //fs.writeFileSync("../drawings/no-bg1.png", body);
    }
  );
});
module.exports = router;
