import fs from "fs";
import path from "path";
import { YtDlp } from 'ytdlp-nodejs';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url'

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ytdlp = new YtDlp();

// Folder for downloads
const downloadsPath = path.join(__dirname, "../downloads");
if (!fs.existsSync(downloadsPath)) fs.mkdirSync(downloadsPath);

const downloadMedia = async (req, res) => {
    try {
        const { videoUrl, quality = '1080p', type = 'mp4' } = req.body;
        
        if (!videoUrl) {
            return res.status(400).json({ error: "Video URL is required" });
        }

        // Get video title
        const info = await ytdlp.getInfoAsync(videoUrl);
        console.log(`${info.title}`);

        const filePath = path.join(downloadsPath, `${info.title}`);

        // Download a video with fluent API - merge audio and video
        const result = await ytdlp
        .download(videoUrl)
        .output(filePath)
        .format({ filter: 'mergeaudio', quality: quality, type: type })
        .on('progress', (p) => console.log(`${p.percentage_str}`))
        .run();

        console.log('Downloaded Successfully:', result.filePaths);

        // Send file to client
        res.download(result.filePaths[0], (err) => {
            if (err) {
                console.error('Error sending file:', err);
            }
        });
    } catch (error) {
        console.error("Error downloading media:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



export  { downloadMedia }