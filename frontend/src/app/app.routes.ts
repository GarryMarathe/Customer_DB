import { Routes } from '@angular/router';
import { CustomerListComponent } from './features/customer/components/customer-list/customer-list.component';
import { CustomerAddComponent } from './features/customer/components/customer-add/customer-add.component';
import { CustomerEditComponent } from './features/customer/components/customer-edit/customer-edit.component';
import { LoginComponent } from './features/user/components/login/login.component';
import { SignupComponent } from './features/user/components/signup/signup.component';

export const routes: Routes = [
    {
        path: '', component: CustomerListComponent
    },
    {
        path: 'home', component: CustomerListComponent
    },
    {
        path: 'login' , component: LoginComponent
    },
    {
        path: 'signup', component: SignupComponent
    },
    {
        path: 'create', component: CustomerAddComponent
    },
    {
        path: 'edit/:id', component: CustomerEditComponent
    },
   
];
