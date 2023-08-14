import { CanActivateFn, Router, NavigationExtras } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(AuthenticationService);
  const router = inject(Router);

  const navigationExtras:NavigationExtras  = {
    queryParams: {  returnUrl: state.url }
    
  };

  if(loginService.isAuthenticate()){
  return true;
  }else{
    console.log("state-url",state.url );
  return router.createUrlTree(["/login"],navigationExtras);
  }
};

