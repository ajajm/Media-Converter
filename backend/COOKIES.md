# YouTube Cookie Authentication Guide

## Why do I need cookies?

YouTube now requires authentication for many videos due to bot detection. Your application needs valid YouTube cookies to download:
- Age-restricted videos
- Private playlists
- Members-only content
- Videos that trigger bot detection

## ✅ Your Setup is Already Done!

Your `backend/cookie.txt` file is already configured and the code has been updated to use it automatically.

## 🔄 How to Update Cookies When They Expire

YouTube cookies typically expire after a few weeks. When you start seeing errors like "Sign in to confirm you're not a bot", you'll need to export fresh cookies.

### Step-by-Step Cookie Export

#### Method 1: Using Cookie-Editor Extension (Recommended)

1. **Install Browser Extension:**
   - Chrome/Edge: [Cookie-Editor](https://chrome.google.com/webstore/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm)
   - Firefox: [Cookie-Editor](https://addons.mozilla.org/en-US/firefox/addon/cookie-editor/)

2. **Export Cookies:**
   - Open a **new private/incognito window**
   - Log into YouTube in that window
   - Navigate to: `https://www.youtube.com/robots.txt` (in the same tab)
   - Click the Cookie-Editor extension icon
   - Click "Export" → "Netscape" format
   - Save and replace your `backend/cookie.txt` file
   - **Close the incognito window immediately** (don't open any other tabs)

#### Method 2: Using get-cookies.txt Extension

1. **Install Extension:**
   - Chrome/Edge: [Get cookies.txt LOCALLY](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc)
   - Firefox: [cookies.txt](https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/)

2. **Export:**
   - Follow same incognito window process as Method 1
   - Navigate to `https://www.youtube.com/robots.txt`
   - Click extension → Export cookies for youtube.com
   - Save to `backend/cookie.txt`

### Important Security Notes

⚠️ **Cookie Safety:**
- Never share your `cookie.txt` file (it contains your session)
- Never commit it to git (already in `.gitignore`)
- Use a throwaway YouTube account if possible
- Cookies are only stored locally on your server

⚠️ **Account Safety:**
- Don't download too many videos too quickly
- Recommended delay: 5-10 seconds between downloads
- Risk of temporary account ban if you exceed rate limits

## 📝 Cookie File Format

Your `cookie.txt` should look like this (Netscape HTTP Cookie format):

```
# Netscape HTTP Cookie File
.youtube.com	TRUE	/	FALSE	1795531267	SID	xxxxx...
.youtube.com	TRUE	/	TRUE	1795531267	__Secure-1PSID	xxxxx...
```

## 🔧 How the Code Uses Cookies

The application automatically:
1. Checks if `backend/cookie.txt` exists on startup
2. Passes cookies to all yt-dlp download requests
3. Shows a warning if cookie file is missing

You'll see this in logs:
```
✓ Cookie file found, using for authentication
```

Or if missing:
```
⚠️  Cookie file not found. Some videos may not be downloadable.
```

## 🐛 Troubleshooting

### "Sign in to confirm you're not a bot" Error

**Solution:** Your cookies have expired. Export fresh cookies following the guide above.

### "This content isn't available" Error

**Causes:**
1. Rate limit exceeded (too many requests)
2. Cookies expired
3. Video truly unavailable

**Solutions:**
1. Add delay between downloads (5-10 seconds)
2. Export fresh cookies
3. Try a different video

### Downloads worked before, now failing

**Cause:** Cookies expired (typically last 2-4 weeks)

**Solution:** Export fresh cookies

## 🚀 For Production/Docker Deployment

### Option 1: Mount Cookie File (Recommended)

```bash
docker run -v /path/to/cookie.txt:/app/cookie.txt media-converter-backend
```

Or in `docker-compose.yml`:
```yaml
services:
  backend:
    volumes:
      - ./backend/cookie.txt:/app/cookie.txt:ro
```

### Option 2: Build Cookie Into Image

```dockerfile
# In backend/Dockerfile
COPY cookie.txt ./
```

⚠️ Warning: Only use this for private deployments. Never push images with cookies to public registries!

### Option 3: Environment Variable (Not Recommended)

While possible, storing cookies in environment variables is less secure and harder to manage.

## 📚 Additional Resources

- [yt-dlp Cookie FAQ](https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp)
- [YouTube Extractor Guide](https://github.com/yt-dlp/yt-dlp/wiki/Extractors#exporting-youtube-cookies)

## 🆘 Still Having Issues?

1. Verify your cookie file format (Netscape format)
2. Check cookie expiration dates in the file
3. Ensure you're using an incognito window when exporting
4. Try with a different YouTube account
5. Check server logs for detailed error messages

---

**Your cookie.txt is already in place and configured!** 🎉

The application will use it automatically. Just remember to update the cookies when they expire (usually every 2-4 weeks).
