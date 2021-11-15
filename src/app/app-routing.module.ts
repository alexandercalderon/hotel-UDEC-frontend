import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {LoginComponent} from './pages/app.login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'profile', component: ProfileComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
