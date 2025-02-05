export interface Customer {
    customer: Customer[];
    _id: String,
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    address?:String,
    city: String,
    state?: String,
    country: String,
    photo: String,
    hobbies?: String[]


}