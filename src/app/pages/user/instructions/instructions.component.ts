import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {


  qid:any;
  quiz:any;
  //questions:any;
  

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _router:Router,
    
    ) { }

  ngOnInit(): void {

    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);


   this._quiz.getQuiz(this.qid).subscribe(
    (data:any)=>{
 
    console.log(data);
     this.quiz=data;
     //this.questions=data.questions;    // modified
    
     //console.log(this.questions);
   
    },
    (error)=>{
      console.log(error)
      Swal.fire('Error','Error in loading the Instruction page and Quiz','error');
    },
   );



  }

  // Method to start Quiz to add Functioanlity of Confirmation .

  public startQuiz()
  {

    Swal.fire({
      title: 'Do you want to Start the Quiz ?',
     
      showCancelButton: true,
      confirmButtonText: 'Start ',
      icon:'info',
     
    }).then((result) => {
         
      if(result.isConfirmed)
      {
         //Check if quiz contains the question , then only start it 




        this._router.navigate(['/start/'+ this.qid]);
      
      
      } 
       else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });


  }


}
