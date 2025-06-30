import { Component, OnInit, DoCheck } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, DoCheck {
  menuOpen = false;
  private lastLang: string | null = null;

  constructor(private router: Router) { }

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

  getCusterName(): String {
    const lang = localStorage.getItem("user_lang") || "FRENCH";
    let res = "";
    if (lang === "France") {
      res = "/fr-cluster";
    }
    if (lang === "UnitedState") {
      res = "/us-cluster";
    }
    if (lang === "Suisse") {
      res = "/ch-cluster";
    }
    return res;
  }

  ngOnInit() {
    this.applyGoogleTranslateLang();
  }

  ngDoCheck() {
    // Vérifie si la langue a changé dans le localStorage
    const lang = localStorage.getItem("user_lang") || "FRENCH";
    if (lang !== this.lastLang) {
      this.applyGoogleTranslateLang();
      this.lastLang = lang;
    }
  }

  redirection(): void {
    const lang = localStorage.getItem("user_lang");
    // Redirection selon la langue
    if (lang === "France") {
      window.location.href = "/fr-cluster";
      return;
    }
    if (lang === "UnitedState") {
      window.location.href = "/us-cluster";
      return;
    }
    if (lang && lang.startsWith("Suisse")) {
      window.location.href = "/ch-cluster";
      return;
    }
    this.logout();
  }

  applyGoogleTranslateLang() {
    const lang = localStorage.getItem("user_lang") || "FRENCH";
    let googleLang = "fr";
    if (lang === "ENGLISH") googleLang = "en";
    if (lang === "SPANISH") googleLang = "es";
    if (lang === "GERMAN") googleLang = "de";
    if (lang === "ITALIAN") googleLang = "it";

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

  isClusterRoute(): boolean {
    // Adapte selon tes clusters
    return (
      this.router.url.startsWith("/fr-cluster") ||
      this.router.url.startsWith("/us-cluster") ||
      this.router.url.startsWith("/ch-cluster")
    );
  }
}
