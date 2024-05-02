import express from 'express';
import * as restaurantController from '../controllers/restaurantController';

const router = express.Router();

// Define routes for restaurant management
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', restaurantController.createRestaurant);
router.put('/:id', restaurantController.updateRestaurantById);
router.delete('/:id', restaurantController.deleteRestaurantById);

export default router;
