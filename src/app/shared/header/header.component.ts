import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: MenuItem[] = [];
  activePath = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        this.activePath = event.urlAfterRedirects;
        this.setMenuItems(); // update style classes
      });

    this.setMenuItems();
  }

  setMenuItems() {
    const tabStyle = (path: string) =>
      this.activePath === path ? 'active-tab' : '';

    this.items = [
      { label: 'Home', routerLink: '/', styleClass: tabStyle('/') },
      { label: 'Teams', routerLink: '/teams', styleClass: tabStyle('/teams') },
      { label: 'Schedule', routerLink: '/schedule', styleClass: tabStyle('/schedule') },
      { label: 'Live Score', routerLink: '/live-score', styleClass: tabStyle('/live-score') },
      { label: 'Announcements', routerLink: '/announcements', styleClass: tabStyle('/announcements') },
      { label: 'Scoreboard', routerLink: '/scoreboard', styleClass: tabStyle('/scoreboard') }
    ];
  }
}
