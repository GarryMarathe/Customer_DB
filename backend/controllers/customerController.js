import 
    {createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer} from '../services/customerService.js'



export const createCustomerController = async (req,res) => {
    const customerData = req.body;

    const photo = req.file ? req.file.path : null  // If photo exists, pass it to the service

    try {
        const customer =  await createCustomer(customerData,photo)  // pass customer data to service
        console.log(customerData)
        res.status(201).json({message: 'Customer created successfully', customer})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Get all customers

export const getAllCustomersController = async (req,res) => {
    try {
        const customer = await getAllCustomers();
        res.status(200).json({message: 'Customer retrieved successfully', customer})
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}

// Get Customer By ID

export const getCustomerByIdController = async (req,res) => {
    try {
        const id = req.params.id;
        const customer = await getCustomerById(id);
        res.status(200).json({message: 'Customer found', customer})
    } catch (error) {
        res.status(404).json({error: error.message})
        
    }
}

// Update customer by ID
export const updateCustomerController = async (req,res) => {
    const id = req.params.id;
    const updatedData = req.body; // Using req.body as a whole to update
    let photo = null;

    // If the request contains a file, update the photo path
    if (req.file) {
      photo = req.file.path; // The file path will be available here
      updatedData.photo = photo; // Add it to updated data
    }
    try {
        const updateCustomers = await updateCustomer(id,updatedData);
        res.status(200).json({message: 'Customer updated successfully', updateCustomers})
    } catch (error) {
        res.status(404).json({error: error.message})
        
    }
}


// Delete customer by ID
export const deleteCustomerController = async (req,res) => {
    const id = req.params.id;
    try {
        const deleteCustomers = await deleteCustomer(id);
        res.status(200).json({message: 'Customer deleted successfully', deleteCustomers})
    } catch(error){
        res.status(404).json({error: error.message})
    }
}