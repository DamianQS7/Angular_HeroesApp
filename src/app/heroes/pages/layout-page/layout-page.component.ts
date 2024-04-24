import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
