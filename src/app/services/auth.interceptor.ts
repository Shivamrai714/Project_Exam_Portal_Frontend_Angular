import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

 // const TOKEN_HEADER ='Authorization';     //error was comming due to this line so direclly added the key in the authrorization  in Line 32.

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private login:LoginService)
    {

    }


    intercept(
        req: HttpRequest<any>,
         next: HttpHandler
         ): Observable<HttpEvent<any>>
         {
            //Code here 
         //add the jwt token from localstorge to the request

         let  authReq = req;
      //Now we need to add the token in the request , to access the protected API by spring security.
          const token= this.login.getToken();
          if(token != null )
          {
                authReq= authReq.clone( {
                    setHeaders : {Authorization: `Bearer ${token}` }, 
                 });
          }
             return next.handle(authReq);
         }
    
}

// need to desing this array :::::  Configuration and
// Need to configure this module in app.module.ts file


export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true , 
    },
];

