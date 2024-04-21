import { Component } from '@angular/core';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  
  public sidebarItems = [
    { label: 'List', url: './list', icon: 'label'},
    { label: 'Add new hero', url: './new-hero', icon: 'add'},
    { label: 'Search', url: './search', icon: 'search'},
  ];
}
