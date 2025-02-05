import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../../models/customer.interface';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerDeleteComponent } from '../customer-delete/customer-delete.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-customer-list',
  imports: [MatPaginator, MatTableModule, MatDialogModule, CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule,FormsModule,MatLabel,MatFormFieldModule,MatInputModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit, AfterViewInit{
  customers: Customer[] = []; // Store all customers
  filteredCustomerList: MatTableDataSource<Customer> = new MatTableDataSource<Customer>(); // Store the filtered customer list
  displayedColumns: string[] = ["serial", "name", "gender", "email", "city", "state", "country", "hobbies", "actions"];
  // dataSource!: MatTableDataSource<Customer>; // Mattabledatasource for pagination
  searchText: string = ''; // New property to bind search input
  @ViewChild(MatPaginator) paginator!: MatPaginator;  // ViewChild to access paginator 




  constructor(
    private customerService: CustomerService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }
 
  ngOnInit(): void {

    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.filteredCustomerList.paginator = this.paginator;
  }


  loadCustomers() {
    this.customerService.getCustomerList().subscribe((data) => {
      this.customers = data.customer;
      this.filteredCustomerList = new MatTableDataSource<Customer>(this.customers);
      // this.dataSource = new MatTableDataSource(this.customers); // Assign customers to MatTableDataSource
      this.filteredCustomerList.paginator = this.paginator; // Assign paginator to MatTableDataSource


    })
  }

  // Method to generate serial number dynamically
  getSerialNumber(index: number): number {
    return (this.paginator.pageIndex * this.paginator.pageSize) + index + 1;
  }

  createCustomer() {
    this.router.navigate(['/create']);
  }


  openCustomerDetails(customer: Customer) {
    const dialogRef = this.dialog.open(CustomerDetailComponent, {
      data: customer,  // Pass the customer data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any result after modal is closed (if necessary)
    });
  }


  openEditDialog() { }

  // Open delete confirmation dialog
  openDeleteDialog(id: string) {
    const dialogRef = this.dialog.open(CustomerDeleteComponent, {
      data: { customerId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteCustomer(id);
      }
    });
  }
  // Delete customer from the list
  deleteCustomer(id: string) {
    this.customerService.deleteCustomer(id).subscribe(
      () => {
        this.snackBar.open('Customer deleted successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.loadCustomers(); // Reload the customer list
        this.router.navigate(['/']);
      },
      (error) => {
        this.snackBar.open('Error deleting customer', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }

  // Method to filter customers based on the search text
  filterResults(text: string) {
    if (!text) {
      this.filteredCustomerList.data = this.customers; // If no search term, show all customers
      return;
    }

    // Filter by first name or last name (case-insensitive)
    this.filteredCustomerList.data = this.customers.filter(
      customer =>
        customer.firstName.toLowerCase().includes(text.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(text.toLowerCase())
    );

    this.filteredCustomerList.paginator = this.paginator;
  }
}
