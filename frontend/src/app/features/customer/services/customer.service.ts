import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }
  
  
  createCustomer(customer: FormData): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}/customers`, customer);
  }

  getCustomerList(): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/customers`);
  }

  getCustomerById(id: String): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/customers/${id}`);
  }

  updateCustomer(id:String, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}/customers/${id}`, customer);
  }

  deleteCustomer(id: String): Observable<Customer> {
    return this.http.delete<Customer>(`${this.url}/customers/${id}`);
  }
}
