import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu-scroll-content">
			<ul class="navigation-menu">
				<li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
			</ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    public model: any[];

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'UI Kit', icon: 'pi pi-fw pi-star-o', routerLink: ['/uikit'], badge: 6,
                items: [
                    {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
                    {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                    {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                    {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                    {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
                    {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                    {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                    {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                    {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
                    {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
                    {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                    {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                    {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                    {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
                ]
            },
            {
                label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
                items: [
                    {label: 'Display', icon: 'pi pi-fw pi-desktop', routerLink: ['utilities/display']},
                    {label: 'Elevation', icon: 'pi pi-fw pi-external-link', routerLink: ['utilities/elevation']},
                    {label: 'FlexBox', icon: 'pi pi-fw pi-directions', routerLink: ['utilities/flexbox']},
                    {label: 'Icons', icon: 'pi pi-fw pi-search', routerLink: ['utilities/icons']},
                    {label: 'Text', icon: 'pi pi-fw pi-pencil', routerLink: ['utilities/text']},
                    {label: 'Widgets', icon: 'pi pi-fw pi-star-o', routerLink: ['utilities/widgets']},
                    {label: 'Grid System', icon: 'pi pi-fw pi-th-large', routerLink: ['utilities/grid']},
                    {label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', routerLink: ['utilities/spacing']},
                    {label: 'Typography', icon: 'pi pi-fw pi-align-center', routerLink: ['utilities/typography']}
                ]
            },
            {
                label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'], badge: 8, badgeStyleClass: 'teal-badge',
                items: [
                    {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
                    {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
                    {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login']},
                    {label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice']},
                    {label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help']},
                    {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error']},
                    {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound']},
                    {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access']},
                    {label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty']}
                ]
            },
            {
                label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
            },
            {
                label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
            }
        ];
    }
}
