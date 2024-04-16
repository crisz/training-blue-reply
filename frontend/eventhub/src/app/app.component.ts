import { Component, signal } from '@angular/core';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatSlideToggleModule,MatSlideToggle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = signal('eventhub');

  change() {
    this.title.set('hello');
  }
}
