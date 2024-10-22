import { addAddress, deleteAddress, getAllAddresses, updateAddress } from "../controllers/address_controller.js";
import {authenticate} from "../middleware/authenticate.js";

import express from "express";

const router = express.Router();


router.post('/add',authenticate ,addAddress);
router.get('/all',authenticate,getAllAddresses)
router.delete('/:id', authenticate, deleteAddress); // Delete address by ID
router.put('/:id', authenticate, updateAddress);

export default router;