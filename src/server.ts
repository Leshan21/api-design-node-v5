import express from 'express';
import { fa } from 'zod/locales';

const app = express();

app.get('/health', (req, res) => { // req is what the client sends, res is what we send back from the server
  res.send("<button>click</button>").status(200); // Corrected order of method calls
})

app.post('/cake/:name/:id', (req, res) => { 
  res.json(req.params);
}
)

export { app }; // Export the app for use in other modules

export default app; // Default export for convenience means we can import without curly braces