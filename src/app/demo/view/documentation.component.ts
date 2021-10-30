import {Component} from '@angular/core';

@Component({
    templateUrl: './documentation.component.html',
    styles: [`
        .docs h1 {
            margin-top: 30px;
        }

        .docs pre.doc-command {
            font-family: monospace;
            background-color: #0C2238;
            color: #dddddd;
            padding: 1em;
            font-size: 14px;
            border-radius: 3px;
            overflow: auto;
        }`
    ]
})
export class DocumentationComponent {
}
