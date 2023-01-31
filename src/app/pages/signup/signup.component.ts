import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
//STep 11 c : 
  constructor( private userService:UserService , private snack:MatSnackBar
  ) { }

  //STEP 10 : create the vacant user to bind the data 

  public user={
   username:'',
   password:'',
   firstname:'',
   lastname:'',
   email:'',
   phone:'',
  };




  ngOnInit(): void {
  }


  //Give the defination of the funtions here.

  formSubmit()
  {
   console.log(this.user);
if(this.user.username == '' || this.user.username == null)
{
 // alert('User is requiered !! ');

 this.snack.open('Username is required !! ','ok', { duration:3000 //, verticalPosition:'top'
}
 );
 return;
}

//STEP 11 b
// add user fuunction from the userSerivice component.
this.userService.addUser(this.user).subscribe(
(data:any)=>
{

  this.user.username='';
  this.user.password='';
  this.user.firstname='';
  this.user.lastname='';
  this.user.email='';
  this.user.phone='';
  
  //Since user is registered we are emptying the fields only.


  //success
  console.log(data);
  //alert('success');
  Swal.fire('Successfully Done ',' Registered User id : '+ data.id ,'success')


},
(error)=>
{
//error
console.log(error);
//alert('error');
this.snack.open('something went wrong','',{duration:3000} );
}
);

  }



}
