import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})


export class AdminGuard implements CanActivate {
  
  //STEP 17 : create constructor and then use in below method.

  constructor(private login:LoginService , private router:Router)
  {}
  

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    
      if(this.login.isLoggedIn() && this.login.getUserRole()=='ADMIN')
     {  return true;
       }
    else
      {
       // using the router link to redirect to other link. Also can use the window.redirect here
     
       this.router.navigate(['login']);
return false;
      }

  }
  
}
