import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './../../Courses-Project/src/app/app.component';
import { appConfig } from './app/app.config';
// import { importProvidersFrom } from '@angular/core';
// import { AppRoutingModule } from './../../Courses-Project/src/app/app-routing.module';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent,appConfig)
.catch(err => console.error(err));
