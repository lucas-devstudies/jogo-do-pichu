import { Routes } from '@angular/router';
import { Principal } from './features/principal/principal';
import { Login } from './features/login/login';
import { Registro } from './features/registro/registro';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'',redirectTo:'principal',pathMatch:'full'},
    {path:'principal',canActivate:[authGuard],component:Principal},
    {path:'entrar',component:Login},
    {path:'registro',component:Registro},
];
