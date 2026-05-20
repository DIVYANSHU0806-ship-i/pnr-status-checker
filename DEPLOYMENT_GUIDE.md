# PNR Status Checker

A complete, production-ready application to check railway PNR status easily. Built with Node.js, React, and MongoDB.

## 🌟 Features

✅ **Instant PNR Status Check** - Get railway ticket status in seconds
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **IRCTC Integration** - Real-time data from IRCTC API
✅ **Mock Data Support** - Test without API key
✅ **Search History** - Track your searches
✅ **Statistics** - View platform statistics
✅ **Rate Limiting** - Secure API endpoints
✅ **Caching System** - Fast responses
✅ **Production Ready** - Fully tested and optimized
✅ **Docker Support** - Easy deployment

## 🚀 Quick Start

### Local Development

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (in another terminal)
cd web
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local
npm start
```

### Docker Deployment

```bash
docker-compose up -d
```

## 📱 Test PNR Numbers

- `1234567890` - Confirmed ticket
- `9876543210` - RAC ticket
- `5555555555` - Waiting list

## 🔗 API Endpoints

```
GET /api/pnr/status/:pnrNumber
GET /api/pnr/history
GET /api/pnr/stats
GET /api/health
```

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React, Tailwind CSS
- **Hosting**: Render, Heroku, AWS, Docker

## 📖 Documentation

See full documentation in individual files.

## 📄 License

MIT