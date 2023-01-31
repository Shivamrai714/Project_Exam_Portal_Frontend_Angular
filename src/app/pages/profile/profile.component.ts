import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{
      user:any;
  constructor(private login:LoginService) { }

  ngOnInit(): void
  {
  
  // M1: it get the data from the local server.
  this.user= this.login.getUser(); 
  
  // M2: or can use this to fetch the data form the server not from the local storage
  // this.login.getCurrentUser().subscribe(
  //   (user:any)=>
  //    {
  //        this.user=user;
  //    },
  //   (error)=>
  //   {
  //     alert('error');
  //   }

  // )
  
  
  }

}
