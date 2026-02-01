# AI Chatbot

Modern AI chatbot built with React, Node.js/Express, and Groq Cloud API.

## Features

- 🎨 Beautiful, responsive UI with light/dark mode
- 💬 Real-time chat with typing animation
- 🤖 Powered by Groq Cloud API (gpt-oss-120b model)
- 🔒 Secure backend with rate limiting
- ⚡ Fast development with Vite

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file (or edit the existing one):

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

Get your API key from [Groq Console](https://console.groq.com).

### 3. Run Development Server

```bash
npm run dev
```

This starts both:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## Project Structure

```
chatbot/
├── server/
│   ├── index.js           # Express server
│   ├── routes/
│   │   └── chat.js        # Chat API endpoint
│   └── middleware/
│       └── rateLimit.js   # Rate limiting
├── src/
│   ├── main.jsx           # React entry
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles
│   └── components/
│       ├── ChatWidget.jsx     # Chat container
│       ├── MessageList.jsx    # Message list
│       ├── MessageBubble.jsx  # Message bubbles
│       ├── TypingIndicator.jsx
│       └── ChatInput.jsx      # Input form
├── index.html
├── vite.config.js
├── package.json
└── .env
```

## API Endpoint

**POST /api/chat**

Request:
```json
{
  "message": "Hello, how are you?"
}
```

Response:
```json
{
  "response": "I'm doing well, thank you for asking! How can I help you today?"
}
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (frontend + backend) |
| `npm run server` | Start backend only |
| `npm run client` | Start frontend only |
| `npm run build` | Build for production |
| `npm start` | Run production server |

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express
- **AI**: Groq Cloud API
- **Styling**: CSS with custom properties

## License

MIT
