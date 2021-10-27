import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <div class="layout-config" [ngClass]="{'layout-config-active': app.configActive}" (click)="app.onConfigClick($event)">
            <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
                <i class="pi pi-cog"></i>
            </a>
            <a style="cursor: pointer" class="layout-config-close" (click)="onConfigCloseClick($event)">
                <i class="pi pi-times"></i>
            </a>
            <div class="layout-config-content">
                <h5 style="margin-top: 0">Input Style</h5>
                <div class="p-formgroup-inline">
                    <div class="p-field-radiobutton">
                        <p-radioButton name="inputStyle" value="outlined" [(ngModel)]="app.inputStyle" inputId="inputStyle1"></p-radioButton>
                        <label for="inputStyle1">Outlined</label>
                    </div>
                    <div class="p-field-radiobutton">
                        <p-radioButton name="inputStyle" value="filled" [(ngModel)]="app.inputStyle" inputId="inputStyle2"></p-radioButton>
                        <label for="inputStyle2">Filled</label>
                    </div>
                </div>

                <h5>Ripple Effect</h5>
                <p-inputSwitch [ngModel]="app.ripple" (onChange)="app.onRippleChange($event)"></p-inputSwitch>

                <h5>Menu Type</h5>
                <div class="p-field-radiobutton">
                    <p-radioButton name="menuMode" value="static" [(ngModel)]="app.layoutMode" inputId="mode1"></p-radioButton>
                    <label for="mode1">Static</label>
                </div>
                <div class="p-field-radiobutton">
                    <p-radioButton name="menuMode" value="overlay" [(ngModel)]="app.layoutMode" inputId="mode2"></p-radioButton>
                    <label for="mode2">Overlay</label>
                </div>

                <h5>Menu Colors</h5>
                <div class="p-field-radiobutton">
                    <p-radioButton name="darkMenu" [value]="true" [(ngModel)]="app.darkMenu" inputId="darkMenu1"></p-radioButton>
                    <label for="darkMenu1">Dark</label>
                </div>
                <div class="p-field-radiobutton">
                    <p-radioButton name="darkMenu" [value]="false" [(ngModel)]="app.darkMenu" inputId="darkMenu2"></p-radioButton>
                    <label for="darkMenu2">Light</label>
                </div>

                <h5>Theme Modes</h5>
                <div class="p-field-radiobutton">
                    <p-radioButton name="compactMode" [value]="true" [(ngModel)]="app.compactMode" inputId="compactMode1" (onClick)="changeThemeStyle($event, true)"></p-radioButton>
                    <label for="compactMode1">Compact</label>
                </div>
                <div class="p-field-radiobutton">
                    <p-radioButton name="compactMode" [value]="false" [(ngModel)]="app.compactMode" inputId="compactMode2" (onClick)="changeThemeStyle($event, false)"></p-radioButton>
                    <label for="compactMode2">Standart</label>
                </div>

                <h5>Themes</h5>
                <div class="layout-themes">
                    <div *ngFor="let theme of themes">
                        <a style="cursor: pointer" (click)="changeTheme(theme.label)" [ngStyle]="{'background-color': theme.color}">
                            <i class="pi pi-check" *ngIf="themeColor === theme.label"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    themes: any[];

    themeColor = 'blue-grey';

    constructor(public app: AppMainComponent) {
    }

    ngOnInit() {
        this.themes = [
            {label: 'blue', color: '#1976d2'},
            {label: 'blue-grey', color: '#607D8B'},
            {label: 'cyan', color: '#0097a7'},
            {label: 'dark-blue', color: '#3e464c'},
            {label: 'dark-green', color: '#2f4050'},
            {label: 'deep-purple', color: '#673ab7'},
            {label: 'green', color: '#43A047'},
            {label: 'indigo', color: '#3f51b5'},
            {label: 'light-blue', color: '#03A9F4'},
            {label: 'teal', color: '#009688'}
        ];
    }

    changeTheme(theme) {
        this.themeColor = theme;
        if (this.app.compactMode) {
            this.changeStyleSheetsColor('theme-css', 'theme-' + theme + '-compact.css');
        } else {
            this.changeStyleSheetsColor('theme-css', 'theme-' + theme + '.css');
        }
        this.changeStyleSheetsColor('layout-css', 'layout-' + theme + '.css');
    }

    changeStyleSheetsColor(id, value) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = value;

        const newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    changeThemeStyle(event, compactMode) {
        if (compactMode) {
            this.changeStyleSheetsColor('theme-css', 'theme-' + this.themeColor + '-compact.css');
        }
        else {
            this.changeStyleSheetsColor('theme-css', 'theme-' + this.themeColor + '.css');
        }
    }

    onConfigButtonClick(event) {
        this.app.configActive = !this.app.configActive;
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.app.configActive = false;
        event.preventDefault();
    }
}
