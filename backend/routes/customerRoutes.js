import express from 'express';
import upload from '../middlewares/upload.js';
import { createCustomerController, deleteCustomerController, getAllCustomersController, getCustomerByIdController, updateCustomerController } from '../controllers/customerController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', upload.single('photo'), createCustomerController); // Create Customer
router.get('/', getAllCustomersController); // Get All Customers
router.get('/:id', getCustomerByIdController); // Get Customer by ID
router.put('/:id', upload.single('photo'), updateCustomerController); // Update Customer
router.delete('/:id', deleteCustomerController); // Delete Customer

export default router;