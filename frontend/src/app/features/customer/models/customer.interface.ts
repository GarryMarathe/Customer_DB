export interface Customer {
    _id: String,
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    address?:string,
    city: string,
    state?: string,
    country: string,
    photo: string,
    hobbies?: string[]


}