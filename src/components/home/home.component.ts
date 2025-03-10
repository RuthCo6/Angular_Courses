import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [MatButtonModule,RouterOutlet, RouterLink,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent { 
    role: string | null = null;

    constructor() {
      if (typeof window !== 'undefined') {
        this.role = localStorage.getItem('role');
      }
    }
    
}
