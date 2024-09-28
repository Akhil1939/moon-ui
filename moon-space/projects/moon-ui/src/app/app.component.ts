import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoonLibComponent } from '@moon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MoonLibComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'moon-ui';
}
