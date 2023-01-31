import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

 qid:any;
 questions:any;
maxMarks:any;
timer:any;

 marksGot:any;
 correctAnswers:any;
 attempted:any;
 successRate:any;
 
 isSubmit=false;



  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _router:Router,

    ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];   // qid var is sane as used in path in app.routeing.ts file

    console.log(this.qid);
   
    this.loadQuestions();
  



  }


  loadQuestions()
  {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
       
       // console.log(data);
       this.questions=data;
       
        // 
     
      
        //setting the val of times , assugin each ques given 1 min.
      this.timer=this.questions.length *1 *60;
      
      console.log(this.questions);
     this.startTimer();

      },
      (error:any)=>{
        console.log(error);
         Swal.fire('Error','Error in Loading Question of Quz','error');
      }
    );
  }

//Disbale the back button while giveing quiz. 
  preventBackButton()
  {
    history.pushState(null,'null',location.href);
    this.locationSt.onPopState(
      ()=>{
        history.pushState(null,'null',location.href);
      }
    );
 
  }

public submitQuiz()
 {
  Swal.fire({
    title: 'Do you want to Submit the Quiz ?',
    showCancelButton: true,
    confirmButtonText: 'Submit ',
    icon:'info',
   
  }).then((e) => {
       
    if(e.isConfirmed)
    {

     // If Submit button is pressed this will work :Do the calculation : in backend ,
       this.evalQuiz();

      }
  });

 }




 // Timer reducing fucntion

 public startTimer()
 {
  let t = window.setInterval(()=>{
      if(this.timer <=0 )
      {
        this.evalQuiz();  //When timer is exhauseted directly evalutaion takes place.
        clearInterval(t);
      }
      else{
        this.timer--;
      }

    },1000                   // update after each second
  );
 }


  //GEt Formated Time

  public getFormatedTime()
  {
     let mm=Math.floor(this.timer/60);
     let ss= this.timer- mm*60;
     return `${mm} min : ${ss} sec`;

  }


  public evalQuiz()
  {
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
         
        console.log(data);
         
          this.maxMarks=data.maxMarks;
          this.marksGot=Number(data.marksGot).toFixed(2);
          this.correctAnswers=data.correctAnswers;
          this.attempted=data.attempted;
          this.isSubmit=true;   //means user has attempted it , no all question will be hided

        this.successRate=Number( ((data.correctAnswers)/(this.questions.length))*100).toFixed(2);
        //  {{ 100.0*(correctAnswers)/(questions.length)}}
  },
  (error)=>{
    Swal.fire('Error','Error in Evaluating ','error');  
  });


}



// Print page

public printPage()
{
window.print();
}



}
