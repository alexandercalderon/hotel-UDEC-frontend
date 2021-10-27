import {Component} from '@angular/core';


@Component({
    /* tslint:disable:component-selector */
    selector: 'app-sidebarTabContent',
    /* tslint:enable:component-selector */
    template: `
        <div class="layout-submenu-content">
            <ng-content></ng-content>
        </div>
    `
})
export class AppSidebartabcontentComponent {
}
