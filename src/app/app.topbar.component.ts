import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';

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
                            <span class="topbar-item-name profile-name">Claire White</span>
                            <span class="topbar-item-name profile-role">System Admin</span>
                        </div>
                    </a>

                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-user"></i>
                                <span>Profile</span>
                                <span class="topbar-submenuitem-badge">5</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-lock"></i>
                                <span>Privacy</span>
                                <span class="topbar-submenuitem-badge">2</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-cog"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-sign-out"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li #settings [ngClass]="{'active-topmenuitem':app.activeTopbarItem === settings}">
                    <a href="#" (click)="app.onTopbarItemClick($event,settings)">
                        <i class="topbar-icon pi pi-cog"></i>
                        <span class="topbar-item-name">Settings</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-palette"></i>
                                <span>Change Theme</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-heart"></i>
                                <span>Favorites</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-lock"></i>
                                <span>Lock Screen</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-image"></i>
                                <span>Wallpaper</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li #messages [ngClass]="{'active-topmenuitem':app.activeTopbarItem === messages}">
                    <a href="#" (click)="app.onTopbarItemClick($event,messages)">
                        <i class="topbar-icon pi pi-envelope"></i>
                        <span class="topbar-badge">5</span>
                        <span class="topbar-item-name">Messages</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar1.png" width="35"/>
                                <span>Give me a call</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar2.png" width="35"/>
                                <span>Sales reports attached</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar3.png" width="35"/>
                                <span>About your invoice</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar2.png" width="35"/>
                                <span>Meeting today at 10pm</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar4.png" width="35"/>
                                <span>Out of office</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li #notifications [ngClass]="{'active-topmenuitem':app.activeTopbarItem === notifications}">
                    <a href="#" (click)="app.onTopbarItemClick($event,notifications)">
                        <i class="topbar-icon pi pi-clock"></i>
                        <span class="topbar-badge">4</span>
                        <span class="topbar-item-name">Notifications</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-sliders-h"></i>
                                <span>Pending tasks</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-calendar"></i>
                                <span>Meeting today at 3pm</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-download"></i>
                                <span>Download documents</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                <i class="pi pi-ticket"></i>
                                <span>Book flight</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li #search class="search-item" [ngClass]="{'active-topmenuitem':app.activeTopbarItem === search}"
                    (click)="app.onTopbarItemClick($event,search)">
                        <span class="p-input-icon-right">
                            <input type="text" pInputText placeholder="Search">
                            <i class="topbar-icon pi pi-search"></i>
                        </span>
                </li>
            </ul>
        </div>
    `
})
export class AppTopbarComponent {

    constructor(public app: AppMainComponent) {}

}
