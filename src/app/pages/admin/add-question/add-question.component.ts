import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

 
 public Editor=ClassicEditor;
  qId: any;
  qTitle:any ;

  // Take these fields of Question as it is defined in model of springboot.
   question={
    quiz:{
      qId:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
   };
 




  constructor(private _route:ActivatedRoute,
    private _router:Router,
    private _question:QuestionService) { }

  ngOnInit(): void {
  
    this.qId = this._route.snapshot.params['qid'];
     this.qTitle=this._route.snapshot.params['title'];
    //The variable of the params.qid is should be same as varible used in url path in app.routing.ts file
   
    //console.log(this.qId);
     //So here we are putting the quidid inside the quiz ,, && quiz['qId'] = this is same as springboot model qId of Quiz
     this.question.quiz['qId']=this.qId;   //basically binding the  url id with the local id variable to displayed in page
  
    }

// Calling function on submiting the add question form and attach it with the ngSubmit()
    public formSubmit()
    {
 // apply the validation for content ,and other option same as this
 if(this.question.content.trim()=='' || this.question.content==null)
 { //Can also use MAtSnack bar to show msg
  return;
 }


 //After validation , submit the form to database , Quetaion added Successfully

 //form submit to add Ques

 this._question.addQuestion(this.question).subscribe(

(data:any)=>{

  Swal.fire('Success','Question Added','success'); 
  //Can also use then() function to redirect
  console.log(data);
 
  //Empty the background fields
 this.question={

  content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{
      qId:''
    },
   };
 
   this._router.navigate(['/admin/quizzes']);

},
(error)=>{
  Swal.fire('Error','Error in Saving Question','error');
}
 );


    }




}
