import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/customer.interface';
import { CustomerService } from '../../services/customer.service';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import locationData from './location-data.json';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-customer-edit',
  imports: [MatLabel,CommonModule,FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatRadioButton,MatRadioModule,MatOption,MatSelect],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {
  customer: Customer | null = null;  // Store the customer to be edited
  customerId!: any;          // Store the customer id from the route
  data!: any;
  fileName: any;
  currentPhotoUrl!: string;
  photoFile: any;
  newPhotoSelected!: boolean;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

 // Location data
 countries = locationData.countries;
 states: any[] = [];
 cities: string[] = [];

  constructor(
    private route: ActivatedRoute,  // To access the route params
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Get the customer id from the route
    this.customerId = this.route.snapshot.paramMap.get('id');
    
    // Fetch the customer details using the id
    this.customerService.getCustomerById(this.customerId).subscribe(
      (data) => {
        console.log(data)
        this.data = data;
        console.log(this.data.photo)
        this.currentPhotoUrl = this.data.photo; // Store the current photo URL
        this.setupLocationData(); // Load location data when customer data is available
        // this.customer = data;
      },
      (error) => {
        this.snackBar.open('Error fetching customer details', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }

  // Set up the location data for the selected customer
  setupLocationData() {
    // Set the available states and cities based on the customer's country and state
    const country = this.countries.find(c => c.name === this.data.country);
    if (country) {
      this.states = country.states;
      const state = country.states.find(s => s.name === this.data.state);
      if (state) {
        this.cities = state.cities;
      }
    }
  }

  // Handle country change event
  onCountryChange(event: any) {
    const selectedCountry = event.value;
    this.states = [];
    this.cities = [];
    this.data.state = ''; // Clear the state when the country changes
    this.data.city = '';  // Clear the city when the state changes

    const country = this.countries.find(c => c.name === selectedCountry);
    if (country) {
      this.states = country.states;
    }
  }

  // Handle state change event
  onStateChange(event: any) {
    const selectedState = event.value;
    this.cities = [];
    this.data.city = ''; // Clear the city when the state changes

    const country = this.countries.find(c => c.name === this.data.country);
    if (country) {
      const state = country.states.find(s => s.name === selectedState);
      if (state) {
        this.cities = state.cities;
      }
    }
  }

  // Handle file change (photo upload)
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name; // Get the new file name
      this.newPhotoSelected = true; // Set the flag to true
    }
  }
  
  // Update customer details (including photo upload if any)
  updateCustomer(): void {
    if (this.data) {
      const formData = new FormData();
      formData.append('firstName', this.data.firstName);
      formData.append('lastName', this.data.lastName);
      formData.append('email', this.data.email);
      formData.append('gender', this.data.gender);
      formData.append('country', this.data.country);
      formData.append('state', this.data.state);
      formData.append('city', this.data.city);
      formData.append('address', this.data.address);
      // formData.append('hobbies', this.data.hobbies.join(','));

          // Ensure hobbies is an array before calling join
    const hobbies = Array.isArray(this.data.hobbies) ? this.data.hobbies : (this.data.hobbies ? [this.data.hobbies] : []);
    formData.append('hobbies', hobbies.join(','));
         // If a new photo is selected, append the new file
    if (this.newPhotoSelected) {
      const photoFile = this.fileInput.nativeElement.files![0];  // Use ViewChild reference here
      formData.append('photo', photoFile, this.fileName);
    }


      // Send the request to update the customer data
      this.customerService.updateCustomer(this.customerId, formData).subscribe(
        (response) => {
          this.snackBar.open('Customer updated successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/']);  // Navigate back to customer list
        },
        (error) => {
          this.snackBar.open('Error updating customer', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      );
    }
  }
}
