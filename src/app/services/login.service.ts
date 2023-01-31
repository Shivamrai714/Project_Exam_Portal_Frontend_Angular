import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
   //STEP 17 : Video 17 Solution
   public loginStatusSubject = new Subject<boolean>();    ///********** */


  //STEP 16 b 
  constructor(private http:HttpClient) { }


  //generate token 

  public generateToken(loginData:any)                    // login data is temp var created in the .ts file - loginData{username="" , password=""}
  {
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

//STEP 16 c : Saving the token and user details in the local Storage 

//login user . set token in localstorage      //***************any
public loginUser(token:any)
{
  localStorage.setItem("token",token);
  return true;
}

//check user is login  or not
public isLoggedIn()
{
  let tokenStr= localStorage.getItem("token");

  if(tokenStr==undefined || tokenStr==''|| tokenStr==null)
  {return false; 
  }
  else {return true;}

}


// logout function : remove token from local storage
public LoggedOut()
{
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
}

// to get the token 
public getToken()
{
  return localStorage.getItem('token');
}

//to set userDetails , so no repetive requests to backend
public setUser(user:any)
{
localStorage.setItem('user',JSON.stringify(user));
}

// to get the user
public getUser()
{
  let userStr= localStorage.getItem("user");
   if(userStr!=null)
   {
    return JSON.parse(userStr);
   }else{
    this.LoggedOut();
    return null;
   }
}


// get user role , ADIMN or NORMAL user
public getUserRole()
{
  let user= this.getUser();
    return user.authorities[0].authority;    // Will tell user is ADMIN/ NORMAL,  Check on console the data of  current user in localstorage ,  authorities is array in user so using it and returning its 0 ele for the role.. //This come after implementing the UserDetails  in user class

}

//Video 17 after

// to get the current logged  in user
public getCurrentUser()
{
  return this.http.get(`${baseUrl}/current-user`);
}




}
