import {Component, ViewEncapsulation} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(){
    window['$'] = window['jQuery'] = $;
  }
  title = 'kedi-app';
}
