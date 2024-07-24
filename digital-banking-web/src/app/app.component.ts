import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit{
  title = 'digital-bankingg-web';
  constructor(private authService : AuthService) {
  }

  ngOnInit() {
    this.authService.loadJwtTokenFormLocalStorage();
  }
}
