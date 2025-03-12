<<<<<<< HEAD
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent,HomeComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Courses-Project';
}
=======
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent,HomeComponent,RouterModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Courses-Project';
}
>>>>>>> dc1607a (Add existing project files)
