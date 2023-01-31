import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


   loginData={
    username:'',
    password:'',
   };

  constructor(private snack:MatSnackBar , private login:LoginService , private router:Router) 
  { }

  ngOnInit(): void {
  }

//On clicking Login : formSubmit method works efficiently.
   formSubmit()
   {

    console.log("Login button clicked First generate token then validate and login.");
  
    // validation of Username
    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
                             //If want to use snackbar , then declare its obj in the constructor argument first.
    this.snack.open('Username is Required ! ! ','',{duration:3000,});
 return;
   }
    //Validation of password
   if(this.loginData.password.trim()=='' || this.loginData.password==null)
   {
   this.snack.open('password is Required ! ! ','',{duration:3000,});
return;
  } 

//Now we need to requst server to generat token.  
//STEP 16 : create login service component in services package.

//Now call the generate token function of login component ,which need obj of Login service , so add object of LoginService(login) in the constructor argument.

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
         console.log('success');
          console.log(data);
         
          //after successful token generation 
          //1.save token to the localStorage using loginuser()
          this.login.loginUser(data.token);

          this.login.getCurrentUser().subscribe(
            (user:any)=>
          {
               //2.save the user in localstorage
               this.login.setUser(user);
               console.log(user);

               //all things are verified now redirect to the their respective dashboards according to their roles.            
               // redirect ...ADMIN role ==== admin-dashboard
               // redirect  ... NORMAL role === normal dashboard

               if(this.login.getUserRole()=='ADMIN')
               {
                   //admin dashboard
             // window.location.href='/admin';
                 this.router.navigate(['admin'])
                 this.login.loginStatusSubject.next(true);
              
                }
               else if (this.login.getUserRole()=='NORMAL')
               {
                // normal user dashboard
                // Or use this  
                // window.location.href='/user-dashboard';
                this.router.navigate(['user-dashboard/0'])
                this.login.loginStatusSubject.next(true);
               
              
              }
              else
               {
                this.login.LoggedOut();
               

               }

               

            }
          );
          
        },
      (error)=>{
        console.log('Error !');
         console.log(error);
         this.snack.open("Invalid Details   !! Try Again ",'',{duration:3000,} );
        }
    );

//Now debug by running application and checking console , 
//Here error comes "course if blocked by course policy " as Controller is not Annotated with  @Crossorigin
//WE need to place crossOrigin("*") on every controller run from aNGULAR and using the springboot backend. 

//Now when we dubug , by correct usename and password a token is generated over here.
//And we need to save this token. in localstorge of the broweser.





  }


}
