const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

// Serve files from the current directory (where output files are saved)
app.use(express.static(__dirname));

app.post("/api/convert", (req, res) => {
  const { url, format } = req.body;

  if (!url || !["mp3", "mp4"].includes(format)) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  const outputFile = `output.${format}`;
  const command = `yt-dlp -f best -x --audio-format ${format} "${url}" -o "${outputFile}"`;

  exec(command, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Conversion failed" });
    }

    res.json({
      success: true,
      downloadLink: `http://localhost:5000/${outputFile}`, // This will allow download after conversion
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
