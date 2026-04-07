import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { authGuard } from './guards/auth.guard';
import { Config } from './features/config/config';
import { Account } from './features/account/account';
import { History } from './features/history/history';
import { Register } from './features/register/register';
import { Home } from './features/home/home';
import { About } from './features/about/about';

export const routes: Routes = [
    {path:'',redirectTo:'about',pathMatch:'full'},
    {path:'home',canActivate:[authGuard],component:Home},
    {path:'config',canActivate:[authGuard],component:Config},
    {path:'account',canActivate:[authGuard],component:Account},
    {path:'history',canActivate:[authGuard],component:History},
    {path:'login',component:Login},
    {path:'about',component:About},
    {path:'register',component:Register},
    { path: '**', redirectTo: 'about' }
];
