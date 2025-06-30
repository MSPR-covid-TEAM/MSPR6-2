import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImmersiveReaderComponent } from './reader/immersive-reader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ImmersiveReaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenuOnMobile() {
    if (window.innerWidth <= 768) {
      this.menuOpen = false;
    }
  }
}
