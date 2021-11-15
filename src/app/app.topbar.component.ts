import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="logo">
                <a href="#">
                    <img src="assets/layout/images/logo.png">
                </a>
            </div>

			<a href="#">
                <img src="assets/layout/images/logo-text.svg" class="app-name"/>
            </a>

            <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                <i class="pi pi-bars"></i>
            </a>

            <ul class="topbar-menu fadeInDown" [ngClass]="{'topbar-menu-visible': app.topbarMenuActive}">
                <li #profile class="profile-item" [ngClass]="{'active-topmenuitem':app.activeTopbarItem === profile}">
                    <a href="#" (click)="app.onTopbarItemClick($event,profile)">
                        <div class="profile-image">
                            <img src="assets/layout/images/profile-image.png">
                        </div>
                        <div class="profile-info">
                            <span class="topbar-item-name profile-name" *ngIf="isLoggedIn">{{ username }}</span>
                            <span class="topbar-item-name profile-role" *ngIf="isLoggedIn">{{ roles }}</span>
                        </div>
                    </a>

                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="/profile" routerLink="profile">
                                <i class="pi pi-user"></i>
                                <span>Perfíl</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="logout()">
                                <i class="pi pi-sign-out"></i>
                                <span>Salir</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `
})
export class AppTopbarComponent implements OnInit {

    private roles: string[];
    isLoggedIn= false;
    showDashboard = false;
    username: string;

    constructor(public app: AppMainComponent, private tokenStorageService: TokenStorageService) {}

    ngOnInit(): void {
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showDashboard = this.roles.includes("Usuario");

            this.username = user.username;
        }
    }

    logout(): void {
        this.tokenStorageService.signOut();
        window.location.reload();
    }
}
