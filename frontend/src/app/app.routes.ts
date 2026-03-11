import { Routes } from '@angular/router';
import { Principal } from './features/principal/principal';
import { Login } from './features/login/login';
import { Registro } from './features/registro/registro';
import { authGuard } from './guards/auth.guard';
import { Config } from './features/config/config';
import { Account } from './features/account/account';
import { History } from './features/history/history';

export const routes: Routes = [
    {path:'',redirectTo:'principal',pathMatch:'full'},
    {path:'principal',canActivate:[authGuard],component:Principal},
    {path:'config',canActivate:[authGuard],component:Config},
    {path:'account',canActivate:[authGuard],component:Account},
    {path:'history',canActivate:[authGuard],component:History},
    {path:'entrar',component:Login},
    {path:'registro',component:Registro},
];
