<<<<<<< HEAD
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule,RouterOutlet, RouterLink,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent { 
  // role:string|any=localStorage.getItem('role')
    role: string | null = null;

    constructor() {
      if (typeof window !== 'undefined') {
        this.role = localStorage.getItem('role');
      }
    }
    
}
=======
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule,RouterOutlet, RouterLink,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent { 
  // role:string|any=localStorage.getItem('role')
    role: string | null = null;

    constructor() {
      if (typeof window !== 'undefined') {
        this.role = localStorage.getItem('role');
      }
    }
    
}
>>>>>>> dc1607a (Add existing project files)
