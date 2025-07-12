# MentraOS Camera Example App with LLM Analysis

This is an example application for the MentraOS platform that demonstrates photo capture with real-time AI analysis using OpenAI's GPT-4 Vision model.

## Features

- **Photo Capture**: Take photos using the Mentra Live device
- **Real-time Analysis**: Automatic AI analysis of captured photos
- **Web Interface**: View photos and analysis results in a beautiful web interface
- **Dual Modes**: Single photo capture and continuous streaming modes
- **AI Insights**: Get descriptions, tags, captions, and confidence scores

## Setup

### Prerequisites

1. **MentraOS Account**: You need a MentraOS account and API key
2. **OpenAI API Key**: For LLM analysis functionality
3. **Node.js/Bun**: For running the application

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MentraOS Configuration
PACKAGE_NAME=your-package-name
MENTRAOS_API_KEY=your-mentraos-api-key
PORT=3000

# OpenAI Configuration (for LLM analysis)
OPENAI_API_KEY=your-openai-api-key
```

### Installation

1. Install dependencies:
```bash
npm install
# or
bun install
```

2. Set up your environment variables (see above)

3. Run the application:
```bash
npm start
# or
bun start
```

## Usage

### Device Controls

- **Short Press**: Take a single photo with AI analysis
- **Long Press**: Toggle continuous photo capture mode (photos every 30 seconds)

### Web Interface

Access the web interface at `http://localhost:3000/webview` to view:
- Latest captured photo
- Real-time AI analysis status
- Generated captions
- Detailed descriptions
- Relevant tags
- Confidence scores

## API Endpoints

- `GET /webview` - Main photo viewer interface
- `GET /api/latest-photo` - Get latest photo metadata and analysis
- `GET /api/photo/:requestId` - Get photo data

## LLM Analysis Features

The app uses OpenAI's GPT-4 Vision model to provide:

1. **Image Description**: Detailed analysis of what's in the photo
2. **Tags**: Relevant keywords and categories
3. **Captions**: Creative, engaging captions
4. **Confidence Scores**: How confident the AI is in its analysis

## Architecture

- **Backend**: Node.js/TypeScript with Express
- **AI Service**: OpenAI GPT-4 Vision API
- **Frontend**: EJS templates with real-time updates
- **Storage**: In-memory storage (photos and analysis results)

## Development

For development with hot reloading:
```bash
npm run dev
# or
bun run dev
```

## Deployment

The app can be deployed using Docker or any Node.js hosting platform. Make sure to:
1. Set all required environment variables
2. Expose the correct port
3. Set up proper authentication for production use

## License

ISC
