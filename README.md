# PNR Status Checker

A complete production-ready application to check railway PNR status easily. Works on mobile and laptop with IRCTC integration.

## Features

✅ Check PNR status instantly
✅ Works on mobile & laptop (responsive design)
✅ IRCTC API integration
✅ Mock data for testing (no API key needed)
✅ Search history
✅ Statistics dashboard
✅ Rate limiting & security
✅ Caching system
✅ Production-ready

## Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on: http://localhost:5000

### Frontend
```bash
cd web
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
```

Web app runs on: http://localhost:3000

## Test PNR Numbers

- `1234567890` - Confirmed ticket
- `9876543210` - RAC ticket  
- `5555555555` - Waiting list

## API Endpoints

- `GET /api/pnr/status/:pnrNumber` - Check PNR status
- `GET /api/pnr/history` - Get search history
- `GET /api/pnr/stats` - Get statistics
- `GET /api/health` - Health check

## Deployment

See DEPLOYMENT_GUIDE.md for Render, Heroku, AWS deployment options.

## License

MIT