import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-sidebar',
      templateUrl: './app.sidebar.component.html'
})
export class AppSideBarComponent {

    constructor(public app: AppMainComponent) {}

}
