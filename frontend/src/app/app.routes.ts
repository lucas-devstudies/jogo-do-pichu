import { Routes } from '@angular/router';
import { Principal } from './features/principal/principal';
import { Login } from './features/login/login';
import { Registro } from './features/registro/registro';

export const routes: Routes = [
    {path:'',component:Principal},
    {path:'home',component:Principal},
    {path:'login',component:Login},
    {path:'register',component:Registro},
];
