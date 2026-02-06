const express = require("express");
const app = express();
const multer = require("multer");

// middleware
app.use(express.json());


const upload = multer({ storage: multer.memoryStorage() })


/* API Created start */
app.post("/create-post", upload.single("image"), async(req, res) => {
    console.log(req.body);
    console.log(req.file)
})
/* API Created end */

module.exports = app;