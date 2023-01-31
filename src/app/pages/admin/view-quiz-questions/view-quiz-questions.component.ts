import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: any;
  qTitle: any;
  questions=[
     {
      quesId:'',
      image:'',
      content:'',
     option1:'',
     option2:'',
     option3:'',
     option4:'',
     answer:'',
  }


  ];

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar,
  ) { }

  ngOnInit(): void {
  
    //This is used to fetch the id and title send through url request using Activated Route method. 

  this.qId= this._route.snapshot.params['qid'];     // putting data in local variable from the var of URL using Activated Route
  this.qTitle= this._route.snapshot.params['title'];
  this._question.getQuestionsOfQuiz(this.qId).subscribe(
 
    (data:any)=>{ console.log(data) 
     this.questions=data;
    },
    (error)=>{
      console.log(error);
    }

  );

  console.log(this.qId);
  console.log(this.qTitle);

  }


  // Method to Delete Questions 

  
deleteQuestion(qId:any)
{
  // alert(qId);
 
  //Showing the alert of deleteing.

  Swal.fire(
    {
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure to Delete Question ',
    } ).then(  (result)=>
  {
    if(result.isConfirmed)
      {
        //copied the code of delete funmction.
        this._question.deleteQuestion(qId).subscribe(
          (data)=>{
            //success question deleted 
           //Using filter to delete the Quiestion from the fontend
           this.questions=this.questions.filter((q)=> q.quesId != qId);
      
            Swal.fire('Success',"Question Deleted",'success');
      
          },
          (error)=>{
            Swal.fire('Error',"Error in Deleting Question",'error');
          },
        );
      }//end of if
  }
        ) //end of then
}








 //end  
}
