import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<footer class="footer">&copy; 2025 AVK iVL Tournaments</footer>`,
  styles: [`
    .footer {
      text-align: center;
      font-size: 14px;
      color: #999;
      padding: 1rem 0;
      margin-top: 3rem;
    }
  `]
})
export class FooterComponent {}