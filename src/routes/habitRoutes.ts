import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { z } from 'zod'

const router = Router()
const createHabitSchema = z.object({
  name: z.string(),
})

const completeParamSchema = z.object({
  id: z.string(),
})

// Define a GET route for habits
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Habit route works!' })
})

// Define a GET route for a specific habit by ID
router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Habit ID: ${req.params.id}` })
})

// Define a POST route to create a new habit
router.post('/', validateBody(createHabitSchema), (req, res) => {
  res.status(201).json({ message: 'Habit created successfully' })
})

// Define a DELETE route to delete a habit by ID
router.delete('/:id', (req, res) => {
  res.status(204).json({ message: `Habit ID: ${req.params.id} deleted` })
})

// Define a POST route to mark a habit as complete
router.post(
  '/:id/complete',
  validateParams(completeParamSchema),
  validateBody(createHabitSchema),
  (req, res) => {
    res
      .status(200)
      .json({ message: `Habit ID: ${req.params.id} marked as complete` })
  },
)

export default router
