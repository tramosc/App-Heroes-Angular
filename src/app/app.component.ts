import { Component, OnInit } from '@angular/core';
import { authService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'heroesApp';

  constructor( private authService: authService){}

  ngOnInit(): void {
    this.authService.checkAuthentication().subscribe( () => {
      console.log("Logeo listo");
    })
  }







}
