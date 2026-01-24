import { Router } from 'express';

const router = Router();

// Define a GET route for users
router.get('/', (req, res) => {
    res.status(200).json({ message: 'User route works!' });
});

// Define a GET route for a specific user by ID
router.get('/:id', (req, res) => {
  res.status(200).json({ message: `User ID: ${req.params.id}` });
});

// Define a PUT route to update a user by ID
router.put('/:id', (req, res) => {
  res.status(200).json({ message: `User ID: ${req.params.id} updated` });
});

// Define a DELETE route to delete a user by ID
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `User ID: ${req.params.id} deleted` });
})

export default router;