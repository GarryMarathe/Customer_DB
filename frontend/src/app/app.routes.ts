import { Routes } from '@angular/router';
import { CustomerListComponent } from './features/customer/components/customer-list/customer-list.component';
import { CustomerAddComponent } from './features/customer/components/customer-add/customer-add.component';

export const routes: Routes = [
    {
        path: '', component: CustomerListComponent
    },
    {
        path: 'create', component: CustomerAddComponent
    }
];
