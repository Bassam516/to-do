import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ToDoComponent } from './to-do/to-do.component';
import { PageNotFoundedComponent } from './page-not-founded/page-not-founded.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'to-do',canActivate:[authGuard] ,component:ToDoComponent},
    {path:'**', component:PageNotFoundedComponent}
];
