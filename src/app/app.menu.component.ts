import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu-scroll-content" *ngIf="currentUser">
			<ul class="navigation-menu">
				<li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
			</ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {
    currentUser: any;

    public model: any[];

    constructor(public app: AppMainComponent, private token: TokenStorageService) {}

    ngOnInit() {
        this.currentUser = this.token.getUser();
        this.model = [
            {label: 'Panel de Administración', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: this.currentUser.username, icon: 'pi pi-fw pi-info-circle', routerLink: ['/profile'],
                items: [
                    // {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
                    // {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
                    // {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login']},
                    // {label: 'Register', icon: 'pi pi-fw pi-user', routerLink: ['/register']},
                    // {label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice']},
                    // {label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help']},
                    // {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error']},
                    // {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound']},
                    // {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access']},
                    // {label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty']}
                    {label: 'Perfíl', icon: 'pi pi-fw pi-user', routerLink: ['/profile']},
                ]
            },
        ];
    }
}
