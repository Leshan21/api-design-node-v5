import { app } from './server.ts'; // import the Express app from server.ts




app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000'); // Start the server on port 3000
})