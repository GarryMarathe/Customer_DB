import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Customer } from '../../models/customer.interface';

@Component({
  selector: 'app-customer-detail',
  imports: [],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public customer: Customer) {}
}
