import { Router } from 'express'; // Import Router from express
import { register } from '../controllers/authController.ts'; // Import the register function from authController
import { validateBody } from '../middleware/validation.ts';
import { insertUserSchema } from '../db/schema.ts';

const router = Router(); // Create a new router instance

// Define a POST route for user registration
router.post('/register', validateBody(insertUserSchema) ,register)

// Define a POST route for user login
router.post('/login', (req, res) => {
  res.status(201).json({ message: 'User logged in successfully' });
})


export default router; // Export the router as the default export