const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/submit", upload.single("outfitImage"), (req, res) => {
    const address = req.body.address;
    const outfitImage = req.file;

    if (!address) {
        console.log("No address provided.");
    } else {
        console.log("Address:", address);
    }

    if (!outfitImage) {
        console.log("No file uploaded.");
    } else {
        console.log("Uploaded File:", outfitImage);
    }

    // Respond with a recommendation message
    res.json({ message: "Your data has been submitted successfully!" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
