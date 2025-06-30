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
    const lang = localStorage.getItem("user_lang") || "Suisse(fr)";
    if (!lang.startsWith("Suisse")) {
      console.log("[GOOGLE TRANSLATE] Pas de changement, langue non suisse :", lang);
      return;
    }

    let googleLang = "fr"; // défaut
    if (lang === "Suisse(en)") googleLang = "en";
    else if (lang === "Suisse(de)") googleLang = "de";
    else if (lang === "Suisse(it)") googleLang = "it";
    else if (lang === "Suisse(fr)") googleLang = "fr";

    let tries = 0;
    const trySetLang = () => {
      const select = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement;
      if (select) {
        console.log("[GOOGLE TRANSLATE] Tentative de changement :", googleLang);
        if (select.value !== googleLang) {
          select.value = googleLang;
          const event = new Event("change", { bubbles: true });
          select.dispatchEvent(event);
          select.blur();
          select.focus();
          console.log("[GOOGLE TRANSLATE] Langue changée via Google Translate:", googleLang);
        } else {
          console.log("[GOOGLE TRANSLATE] Langue déjà sélectionnée :", googleLang);
        }
      } else if (tries < 20) {
        tries++;
        setTimeout(trySetLang, 300);
      }
    };
    setTimeout(trySetLang, 700);
  }
}
