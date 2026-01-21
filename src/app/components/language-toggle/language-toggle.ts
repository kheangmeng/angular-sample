import { Component, Inject, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, FormsModule],
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.css',
  // template: `
  //   <div class="language-toggle-container">
  //     <span [class.active]="!isFrench">English</span>
  //     <mat-slide-toggle
  //       [ngModel]="isFrench"
  //       (change)="toggleLanguage()"
  //       color="primary"
  //       aria-label="Switch language">
  //     </mat-slide-toggle>
  //     <span [class.active]="isFrench">Français</span>
  //   </div>
  // `,
  // styles: [`
  //   .language-toggle-container {
  //     display: flex;
  //     align-items: center;
  //     gap: 8px;
  //     font-family: Roboto, "Helvetica Neue", sans-serif;
  //   }
  //   .active {
  //     font-weight: 500;
  //     color: #3f51b5;
  //   }
  //   span {
  //     font-size: 14px;
  //   }
  // `]
})
export class LanguageToggleComponent {
  isFrench: boolean;

  constructor(@Inject(LOCALE_ID) public locale: string) {
    this.isFrench = this.locale.startsWith('fr');
  }

  toggleLanguage() {
    const baseUri = document.baseURI;
    const currentUrl = window.location.href;
    const relativePath = currentUrl.startsWith(baseUri) ? currentUrl.substring(baseUri.length) : '';

    // If currently French, remove 'fr/' from base. If English, add 'fr/' to base.
    // const newBase = this.isFrench ? baseUri.replace(/fr\/$/, '') : (baseUri.endsWith('/') ? baseUri + 'fr/' : baseUri + '/fr/');
    // window.location.href = newBase + relativePath;
  }
}
