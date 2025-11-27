# API Design Node v5

A minimal Node.js API server. The entry point starts an HTTP server on port 3000.

## Tech Stack

- Node.js
- TypeScript
- Express (assumed in `server.ts`)

## Project Structure

- `src/index.ts`: Boots the server and listens on port 3000.
- `src/server.ts`: Exports `app` (the Express application).

## How it works

The `index.ts` file imports the Express app from `server.ts` and starts the server:

```ts
import { app } from './server.ts'

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
```

## Prerequisites

- Node.js 18+ (Linux)
- npm or yarn

## Setup

```bash
# Install dependencies
npm install

# Build TypeScript (if configured)
npm run build
```

## Run (development)

```bash
# Start with ts-node or a dev script
npm run dev

# Or run compiled JS
npm start
```

## Run (direct with ts-node)

```bash
npx ts-node src/index.ts
```

## Environment

- Default port: 3000
- Visit: http://localhost:3000

## Scripts (example)

Add these to `package.json` if not present:

```json
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

## Testing

```bash
npm test
```

## Next Steps

- Document routes in `server.ts` (e.g., `/health`, `/api/*`)
- Add error handling and logging
- Add environment configuration (PORT via `.env`)
