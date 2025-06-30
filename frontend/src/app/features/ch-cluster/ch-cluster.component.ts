import { Component, OnInit, DoCheck } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-ch",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./ch-cluster.component.html",
  styleUrls: ["./ch-cluster.component.css"],
})
export class AppComponent implements OnInit, DoCheck {
  menuOpen = false;
  private lastLang: string | null = null;

    ClusterName = "ch-cluster";

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("jwt_token");
  }

  logout(): void {
    localStorage.removeItem("jwt_token");
    window.location.href = "/connexion";
  }

  ngOnInit() {
    this.applyGoogleTranslateLang();
  }

  ngDoCheck() {
    const lang = localStorage.getItem("user_lang") || "Suisse";
    if (lang !== this.lastLang) {
      // Redirection selon la langue
      if (lang === "UnitedState") {
        window.location.href = "/us-cluster";
        return;
      }
      if (lang === "France") {
        window.location.href = "/fr-cluster";
        return;
      }
      // this.applyGoogleTranslateLang(); autre suisse langue
      this.lastLang = lang;
    }
  }

  applyGoogleTranslateLang() {
    const lang = localStorage.getItem("user_lang") || "France";
    let googleLang = "fr";
    if (lang === "Suisse1") googleLang = "en";
    if (lang === "Suisse") googleLang = "de";
    if (lang === "Suisse2") googleLang = "it";

    let tries = 0;
    const trySetLang = () => {
      const select = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement;
      if (select) {
        if (select.value !== googleLang) {
          select.value = googleLang;
          // Simule un vrai événement utilisateur
          const event = new Event("change", { bubbles: true });
          select.dispatchEvent(event);
          // Simule un clic pour certains navigateurs
          select.blur();
          select.focus();
          console.log(
            "[GOOGLE TRANSLATE] Langue changée via Google Translate:",
            googleLang,
          );
        }
      } else if (tries < 20) {
        tries++;
        setTimeout(trySetLang, 300);
      }
    };
    setTimeout(trySetLang, 700);
  }
}
