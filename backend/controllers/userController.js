import fs from "fs";
import path from "path";
import { YtDlp } from 'ytdlp-nodejs';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url'

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cookie file path
const cookiePath = path.join(__dirname, "../cookies.txt");

// Initialize ytdlp with cookie file if it exists
const ytdlpOptions = {};
if (fs.existsSync(cookiePath)) {
    ytdlpOptions.cookiesFile = cookiePath;
    console.log('✓ Cookie file found, using for authentication');
} else {
    console.warn('⚠️  Cookie file not found. Some videos may not be downloadable.');
}

const ytdlp = new YtDlp(ytdlpOptions);

// Folder for downloads
const downloadsPath = path.join(__dirname, "../downloads");
if (!fs.existsSync(downloadsPath)) fs.mkdirSync(downloadsPath);

const downloadMedia = async (req, res) => {
    try {
        const { url, videoUrl, quality = '1080p', type = 'mp4' } = req.body;
        const finalUrl = url || videoUrl; // Support both 'url' and 'videoUrl' keys
        
        if (!finalUrl) {
            return res.status(400).json({ error: "Video URL is required" });
        }

        // Determine if this is a music or video request from the URL path
        const isMusic = req.path.includes('music');
        
        // Get video info
        const info = await ytdlp.getInfoAsync(finalUrl);
        console.log(`Downloading: ${info.title}`);

        // Set file extension and format based on type
        const fileExtension = isMusic ? 'mp3' : 'mp4';
        const fileName = `${info.title}.${fileExtension}`;

        // Download based on type
        let result;
        if (isMusic) {
            // Download audio only
            result = await ytdlp
                .download(finalUrl)
                .output(downloadsPath)
                .extractAudio('mp3')
                .audioQuality('best')
                .cookies(cookiePath)
                .on('progress', (p) => console.log(`${p.percentage_str}`))
                .run();
        } else {
            // Download video with audio merged
            result = await ytdlp
                .download(finalUrl)
                .output(downloadsPath)
                .format({ filter: 'mergeaudio', quality: quality, type: type })
                .cookies(cookiePath)
                .on('progress', (p) => console.log(`${p.percentage_str}`))
                .run();
        }

        console.log('Downloaded Successfully:', result.filePaths);

        // Send file to client
        res.download(result.filePaths[0], fileName, (err) => {
            if (err) {
                console.error('Error sending file:', err);
            } else {
                // Optionally delete the file after sending
                fs.unlink(result.filePaths[0], (unlinkErr) => {
                    if (unlinkErr) console.error('Error deleting file:', unlinkErr);
                    else console.log('File deleted:', result.filePaths[0]);
                });
            }
        });
    } catch (error) {
        console.error("Error downloading media:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



export  { downloadMedia }