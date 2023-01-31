import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
private http:HttpClient

  ) { }
//STEP 11 : a
//add user
public addUser(user:any)
{
  //TO make the call to springboot handler method to save the user.
return this.http.post(`${baseUrl}/user/`,user);
 
//Now this funciton should be called at time of submission of the form.

}


}
