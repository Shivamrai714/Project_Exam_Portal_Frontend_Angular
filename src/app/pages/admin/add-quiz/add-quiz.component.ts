import { Component, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  // 2 creating the model to submit the quiz data to the server using ngModel binding
  // the fields should be same as declared in quiz class to make binding
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },
  };

  // 1 . Fake varaible to show the categories from backedn while adding a quiz.
categories=[
  {
    cid:22,
    title:'Time pass'
  },
  {
    cid:24,
    title: ' Bhjut sara Time pass'
  },
]

//already made the service for Category before so we have made use of its Obj
  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {

  this._cat.categories().subscribe(
  (data:any)=>{
    // data if fetched/loaded in varible "data" , so put it in out variable categories
    this.categories=data;
    console.log(this.categories);
  },
  (error)=>{
console.log(error);
Swal.fire('Error!! ','error in loading data ','error');
  }


  );


  } // end of ngOnInit function .


  //DEFINING THE METHOD TO SUBMIT THE FORM FOR ADDING A QUIZ

  addQuiz()
{

  console.log(this.quizData);  

  //applying validation on tile
  if(this.quizData.title.trim()=='' || this.quizData.title==null)
  {
  this._snack.open('Title Required !! ','',{
      duration:3000,
  });
  return;
  }

  //Now add Quiz data to add  the details to database by making call to the backend api

//We have importeed the var of QuizService , and pass the data object to argument
 this._quiz.addQuiz(this.quizData).subscribe(
  (data:any)=>{
  Swal.fire('Success ','quiz is Added','success');
//Also empty the filds of form , 
this.quizData={
  title:'',
  description:'',
  maxMarks:'',
  numberOfQuestions:'',
  active:false,
  category:{
    cid:'',
  }
};

},
(error:any)=>{
 Swal.fire('error','Error while adding quiz','error');
 console.log(error);
}


);





}










}
