import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: 4rem;
      font-size: 1.2rem;
    }
  `]
})
export class NotFoundComponent {}
