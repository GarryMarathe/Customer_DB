import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-delete',
  imports: [MatButtonModule,MatDialogContent,MatDialogActions],
  templateUrl: './customer-delete.component.html',
  styleUrl: './customer-delete.component.css'
})
export class CustomerDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomerDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close('confirm'); // Pass 'confirm' to notify deletion
  }
}