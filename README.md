"# Media Converter

A powerful containerized web application for downloading YouTube videos and extracting audio. Built with Node.js, Express, React, and TypeScript.

## ✨ Features

- 🎥 Download YouTube videos in various qualities (up to 1080p)
- 🎵 Extract audio as MP3 files
- 🐳 Fully containerized with Docker
- 🚀 Production-ready with health checks
- 📊 Real-time download progress tracking
- 🌐 Cross-platform support
- 🔒 CORS-configurable for security

## 🏗️ Architecture

- **Backend:** Node.js + Express + ytdlp-nodejs
- **Frontend:** React + TypeScript + Vite
- **Web Server:** Nginx (production)
- **Containerization:** Docker + Docker Compose

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd Media-Converter

# Copy and configure environment
cp .env.example .env

# Start the application
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend: http://localhost:5000
```

### Local Development

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend/vite-project
npm install
npm run dev
```

## 📦 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Production Deployment

```bash
# Configure production environment
cp .env.example .env
# Edit .env with your production settings

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Configuration

### Environment Variables

**Backend (`.env`):**
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode
- `CORS_ORIGIN` - Allowed CORS origins

**Frontend (`.env`):**
- `VITE_API_URL` - Backend API URL

See `.env.example` files for all options.

## 📋 API Endpoints

### Backend
- `POST /v1/download/video` - Download video
- `POST /v1/download/music` - Download audio
- `GET /health` - Health check endpoint

### Request Body
```json
{
  "videoUrl": "https://youtube.com/watch?v=...",
  "quality": "1080p",
  "type": "mp4"
}
```

## 🐳 Docker Images

Pre-built images available (after CI/CD setup):
```bash
docker pull your-username/media-converter-backend
docker pull your-username/media-converter-frontend
```

## 🔒 Security

- CORS configuration for origin control
- Environment-based configuration
- No sensitive data in images
- Resource limits in production
- HTTPS-ready with Nginx

## 🛠️ Tech Stack

### Backend
- Node.js 20
- Express.js 5
- ytdlp-nodejs 3.4+
- FFmpeg (bundled)

### Frontend
- React 19
- TypeScript 5
- Vite 7
- CSS3

### DevOps
- Docker & Docker Compose
- Nginx (reverse proxy)
- GitHub Actions (CI/CD ready)

## 📊 Monitoring

### Health Checks
```bash
# Backend health
curl http://localhost:5000/health

# Check Docker container health
docker ps
```

### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📝 License

ISC License

## 👤 Author

**Md Ajaj**

## 🙏 Acknowledgments

- [ytdlp-nodejs](https://github.com/iqbal-rashed/ytdlp-nodejs) - YouTube download wrapper
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Core download functionality
- [FFmpeg](https://ffmpeg.org/) - Media processing

## 📖 Documentation

- [Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
- [API Documentation](#-api-endpoints) - API usage guide
- Environment Configuration - See `.env.example` files

## 🐛 Troubleshooting

Common issues and solutions:

**Connection refused:**
```bash
docker-compose restart
docker-compose logs backend
```

**Build errors:**
```bash
docker-compose build --no-cache
```

**Permission errors:**
```bash
docker-compose down -v
docker-compose up -d
```

For more help, see [DEPLOYMENT.md](DEPLOYMENT.md#-troubleshooting)

## 🌟 Features Roadmap

- [ ] Support for more platforms (Instagram, TikTok)
- [ ] Playlist download support
- [ ] Download history
- [ ] User authentication
- [ ] Queue management
- [ ] Video format conversion

---

**⚠️ Disclaimer:** This tool is for personal use only. Respect copyright laws and YouTube's Terms of Service." 
