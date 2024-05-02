import express from "express";
import * as chefController from "../controllers/chefController";

const router = express.Router();

// Define routes for Chef resource
router.get("/", chefController.getAllChefs);
router.get("/:id", chefController.getChefById);
router.post("/", chefController.createChef);
router.put("/:id", chefController.updateChefById);
router.delete("/:id", chefController.deleteChefById);

export default router;