import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main class="max-w-7xl mx-auto px-4 py-6">
      <router-outlet />
    </main>
  `//,
  //styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('importadora-web');
}
