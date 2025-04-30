import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private renderer: Renderer2) {}

  enableDaltonismMode() {
    this.renderer.addClass(document.body, 'daltonien');
  }

  disableDaltonismMode() {
    this.renderer.removeClass(document.body, 'daltonien');
  }
}
