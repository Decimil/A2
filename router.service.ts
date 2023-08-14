import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  routeToDashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }

  routeToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}