var fs = require('fs');
var path = require('path');
var s3fs = require('s3fs');
var multiparty = require('connect-multiparty');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../../config.json"), "utf8"));
var s3fsBucket = new s3fs('plan-manager-docs', config.awsAccessCredentials);

var express = require('express');
var router = express.Router();

router.use(multiparty());

router.post('/', function (req, res) {
  if (!req.session || !req.cookies.accessToken) {
    return res.json({
      success: false,
      message: "Authentication error."
    });
  }

  var file = req.files.file;
  var fileType = file.originalFilename.split(".")[file.originalFilename.split(".").length - 1];

  if (file.size > 500000) {
    return res.json({
      success: false,
      message: "Upload failed: File must be less than 5MB",
    });
  }

  var stream = fs.createReadStream(file.path);
  var fileName = Math.floor(Math.random() * 1000000000);
  fileName = fileName + "_" + Date.now();
  fileName = fileName + "." + fileType;
  var promise = s3fsBucket.writeFile(fileName, stream);
  return promise.then(function () {
    fs.unlink(file.path, function (err) {
      if (err) { console.error(err); }
    });
    res.json({
      success: true,
      path: fileName,
    });
  });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;

  if (!req.session || !req.cookies.accessToken) {
    return res.json({
      success: false,
      message: "Authentication error."
    });
  }

  s3fsBucket.readFile(req.params.id, function (err, data) {
    if (err) { console.error(err); }
    res.end(data, 'binary');
  });
});

module.exports = router;
