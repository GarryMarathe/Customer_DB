import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { Customer } from '../../models/customer.interface';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import locationData from './location-data.json';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [MatLabel, CommonModule, FormsModule, ReactiveFormsModule, MatError, MatRadioModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatSnackBarModule,MatOption,MatSelectModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent implements OnInit {

  customerForm!: FormGroup;
  fileName: any;


  // Location data
  countries = locationData.countries;
  states: any[] = [];
  cities: string[] = [];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.createForm();
    this.setupLocationListeners();
  }

  createForm() {
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      address: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      hobbies: [''],
      photo: ['', Validators.required],

    })
  }

  setupLocationListeners() {
    // Listen for country changes
    this.customerForm.get('country')?.valueChanges.subscribe(countryName => {
      this.states = [];
      this.cities = [];
      this.customerForm.patchValue({ state: '', city: '' }, { emitEvent: false });
      
      const country = this.countries.find((c: { name: any; }) => c.name === countryName);
      if (country) {
        this.states = country.states;
      }
    });

    // Listen for state changes
    this.customerForm.get('state')?.valueChanges.subscribe(stateName => {
      this.cities = [];
      this.customerForm.patchValue({ city: '' }, { emitEvent: false });
      
      const country = this.countries.find((c: { name: any; }) => c.name === this.customerForm.get('country')?.value);
      if (country) {
        const state = country.states.find((s: { name: any; }) => s.name === stateName);
        if (state) {
          this.cities = state.cities;
        }
      }
    });
  }
  
  createCustomer() {
    if (this.customerForm.invalid) {
      return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append all form fields to FormData
   Object.keys(this.customerForm.value).forEach(key => {
        const value = this.customerForm.value[key];
        if (key === 'photo' && value) {
          formData.append('photo', value, value.name);  // Append the file directly
        } else if (Array.isArray(value)) {
          value.forEach((v: string) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      });


    // const customerData: Customer = this.customerForm.value;
    this.customerService.createCustomer(formData).subscribe(
      () => {
        // this.customerForm.reset();
        // console.log(customerData)
        this.snackBar.open('Customer created successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
      horizontalPosition: 'center',
        });
        this.router.navigate(['/']);
      },
      (error) => {
        this.snackBar.open('Error creating customer', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
      horizontalPosition: 'center',
        });
      }
    );
  }


  // Handle file selection for photo upload (not handled here, just the field for selection)
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file)
      this.fileName = file.name
      this.customerForm.patchValue({
        photo: file, // You can send the file name or path to the backend
      });
    }
  }
  

}