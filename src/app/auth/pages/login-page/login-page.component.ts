import { Component } from '@angular/core';
import { authService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private authService: authService,
    private router: Router
  ) { }

  onLogin() {
    this.authService.login('tramosc98@gmail.com', '124435')
      .subscribe(user => {

        this.router.navigate(['/']);

      });
  }

}
