import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Courses-Project';
}
