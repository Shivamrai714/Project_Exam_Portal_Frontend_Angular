import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;

  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService,

    ) { }



  ngOnInit(): void {

    //Using Activated Route to fetch the catId passed using the path and then loading the quiz of Specific category
    
 this.catId=this._route.snapshot.params['catId'];
 //console.log(this.catId); 

 this._route.params.subscribe(
 
  (params)=> {
    this.catId=params['catId'];


    if(this.catId==0)
    {
     console.log('Load all the quiz');
   
     //OLD : this._quiz.quizzes().subscribe(   
       //Inject Quiz service var to call the backend 
       this._quiz.getActiveQuizzes().subscribe(           
        (data:any)=>{
    
            this.quizzes=data;
            console.log(this.quizzes);
         },
         (error)=>{
            console.log(error);
            alert("Error in loading all quizes");  //Also can use _snack, Swal.fire
         }
       );
   
    }


    else{
      
     console.log('Specific cat loaded');
   // this.quizzes=[];
  
//We have made the handler method for this function explicitily in the backend .
//The main flow was declare this name function in the Quiz Controller 
//-> then declare the function in the interface 
//--> then need to define this in the implementaion quiz Impl.class  which internally 
//--> uses quiz repository () -- we need to give the implementaion as its not inbuit present , we need to give sytax in Camelcase and implementain will be given by Springboot. 


this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
    (data:any)=> {
      this.quizzes=data;
    },
    (error)=>{
      alert("Error in loading quiz");
    },
   );



    }
   
   

  }

 );
  




  }

}
