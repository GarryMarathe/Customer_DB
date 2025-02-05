import Customer from "../models/customerModel.js";

export const createCustomer = async (customerData, photo) => {
    try {
           // If photo exists, add it to customer data
        if(photo){
            customerData.photo = photo
        }

          // Use .create to insert the customer into the database
          const customer = await Customer.create(customerData);
          return customer;

    } catch (error) {
        throw new Error(`Error Creating Customer: ${error.message}`);
        
    }
}

export const getAllCustomers = async () => {
    try {
        const customers = await Customer.find();
        return customers;
    } catch (error) {
        throw new Error(`Error Fetching Customers: ${error.message}`);
        
    }
}

export const getCustomerById = async (id) => {
    try {
        const customer = await Customer.findById(id);
        
    if(!customer){
        throw new Error("Customer Not Found");
        
    }
    return customer;
    } catch (error) {
        throw new Error(`Error Fetching Customer: ${error.message}`);
        
    }
}

export const updateCustomer = async (id, customerData) => {
    try {
        const customer =  await Customer.findByIdAndUpdate(id, customerData, {new: true})
        if (!customer) {
            throw new Error('Customer not found');
          }
          return customer;
    } catch (error) {
        throw new Error(`Error Updating Customer: ${error.message}`);
        
    }
}

export const deleteCustomer = async (id) => {
    try {
        const customer =  await Customer.findByIdAndDelete(id);
        if(!customer){
            throw new Error('Customer not found');
        }
        return customer;
    } catch (error) {
        throw new Error(`Error Deleting customer: ${error.message}`);
        
    }
}

