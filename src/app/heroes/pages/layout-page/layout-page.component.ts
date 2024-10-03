import { Component } from '@angular/core';
import { authService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  constructor(
    private authService: authService,
    private router: Router
  ){}

  public siderbarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

  // obtener el usuario
  get user():User | undefined{
    return this.authService.currentUser;
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
