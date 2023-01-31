import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {


//STEP 1 using the activated Route to collect the id from the url and put it into this.qid
  constructor(private _snack:MatSnackBar,
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _cat:CategoryService,
    private _router:Router,
    ) { }


  qId=0;
  quiz: any;
  categories:any;



  ngOnInit(): void {
//loading the Quiz data from backend uisng id from url
    this.qId=this._route.snapshot.params['qid'];
    //alert(this.qId);

  this._quiz.getQuiz(this.qId).subscribe(
    (data:any)=>{
    this.quiz=data;
    console.log(this.quiz);
    },
  (error:any)=>{
console.log(error);
  }
  );

  //Now loading the data from the categories service and subscribing its properties.
  this._cat.categories().subscribe(
  (data)=>{
    this.categories=data;
  },
  (error)=>{
    alert("Error in loading categories");
  },
  

  );

  }

  //Fucntion to work on submitting the Update button.
  
//update form submit

public updateData()
{
   // apply validatation to check for empty fields 

   if(this.quiz.title.trim()=='' || this.quiz.title==null)
  {
  this._snack.open('Title Required !! ','',{
      duration:3000,
  });
  return;
  }


////////////////// Save the data using the service

   this._quiz.updateQuiz(this.quiz).subscribe(
   
    (data:any)=>
  {

   Swal.fire('Success !! ','quiz updated','success')
   .then( (e) => 
   {
    this._router.navigate(['/admin/quizzes']);
   }
    );

  },

  (error)=>
  {
Swal.fire('Error','error in updateing quiz','error');
console.log(error);
}

   );  
}
}
