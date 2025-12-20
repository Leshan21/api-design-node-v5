import { Router } from 'express'; // Import Router from express

const router = Router(); // Create a new router instance

// Define a POST route for user registration
router.post('/register', (req, res) => {
  res.status(201).json({ message: 'User registered successfully' });
})

// Define a POST route for user login
router.post('/login', (req, res) => {
  res.status(201).json({ message: 'User logged in successfully' });
})


export default router; // Export the router as the default export