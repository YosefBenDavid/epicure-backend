import express from 'express';
import * as dishController from '../controllers/dishController';

const router = express.Router();

// Define routes for dish management
router.get('/', dishController.getAllDishes);
router.get('/:id', dishController.getDishById);
router.post('/', dishController.createDish);
router.put('/:id', dishController.updateDishById);
router.delete('/:id', dishController.deleteDishById);

export default router;