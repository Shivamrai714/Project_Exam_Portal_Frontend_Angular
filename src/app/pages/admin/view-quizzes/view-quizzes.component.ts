import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

 //STEP 1 create dummy object.
// ERROR IS COMMING IF WE EMPTY THE FULL DATA AND THEN title, description are not recognised
 quizzes=[
  {
    qId:23,
    title:'Basic Java Quiz',
    description:' It is a part of the Java programming language that one can use for developing or creating a general-purpose app.',
    maxMarks:'50',
    numberOfQuestions:'20',
    active:'',
    category:{
      title:"Programming"
    },
  },

 ];



  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

     this._quiz.quizzes().subscribe(
        (data:any)=>
        {
          this.quizzes=data;
          console.log(this.quizzes);
        },
        (error)=>
        {
          console.log(error);
          Swal.fire('Error !! ','Error in loading the Quiz data ','error');

        }


     );
  }

//Delete Quiz Function 

deleteQuiz(qId:any)
{
  // alert(qId);
 
  //Showing the alert of deleteing.

  Swal.fire(
    {
      icon:'info',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }
  ).then(  (result)=>
  {
    if(result.isConfirmed)
      {
        //copied the code of delete funmction.
        this._quiz.deleteQuiz(qId).subscribe(
          (data)=>{
            //success quiz deleted 
           //Using filter to delete the Quiz from the fontend
           this.quizzes=this.quizzes.filter((quiz)=> quiz.qId!=qId);
      
            Swal.fire('Success',"Quiz Deleted",'success');
      
          },
          (error)=>{
            Swal.fire('Error',"Error in Deleting Quiz",'error');
          },
        );
      }//end of if
  }
        ) //end of then


}
}
