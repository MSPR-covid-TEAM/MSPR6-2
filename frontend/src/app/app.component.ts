import { Component, OnInit, DoCheck } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  menuOpen = false;
  private lastLang: string | null = null;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    window.location.href = '/connexion';
  }

  ngOnInit() {
    this.applyGoogleTranslateLang();
  }

  ngDoCheck() {
    // Vérifie si la langue a changé dans le localStorage
    const lang = localStorage.getItem('user_lang') || 'FRENCH';
    if (lang !== this.lastLang) {
      this.applyGoogleTranslateLang();
      this.lastLang = lang;
    }
  }

  applyGoogleTranslateLang() {
    const lang = localStorage.getItem('user_lang') || 'FRENCH';
    let googleLang = 'fr';
    if (lang === 'ENGLISH') googleLang = 'en';
    if (lang === 'SPANISH') googleLang = 'es';
    if (lang === 'GERMAN') googleLang = 'de';

    let tries = 0;
    const trySetLang = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        if (select.value !== googleLang) {
          select.value = googleLang;
          // Simule un vrai événement utilisateur
          const event = new Event('change', { bubbles: true });
          select.dispatchEvent(event);
          // Simule un clic pour certains navigateurs
          select.blur();
          select.focus();
          console.log('[GOOGLE TRANSLATE] Langue changée via Google Translate:', googleLang);
        }
      } else if (tries < 20) {
        tries++;
        setTimeout(trySetLang, 300);
      }
    };
    setTimeout(trySetLang, 700);
  }
}
