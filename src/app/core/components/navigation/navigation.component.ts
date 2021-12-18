import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@core/models/User';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.items = [
      { label: 'Login', routerLink: ["auth/login"], icon: 'pi pi-fw pi-home' },
      { label: 'Register', routerLink: ["auth/register"], icon: 'pi pi-fw pi-list' },
    ];

    this.authService.user$.subscribe((user: User) => {
      this.items = [{ label: 'Plants', icon: 'pi pi-fw pi-list' }];
    });

    this.activeItem = this.items[0];
  }
}
