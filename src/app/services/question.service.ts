import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  

  constructor(private _http:HttpClient) 
  {
       
  }
 //For admin , fetching all the question of Quiz
  public getQuestionsOfQuiz(qid:any)
  {
     return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);     
  }

  //VIDEO 40 : For user: Fetching limited Question randomly for the user.
  public getQuestionOfQuizForTest(qid:any)
  {
  return   this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

    // add the question to the database   
    public addQuestion(question:any)
    {
      return this._http.post(`${baseUrl}/question/`,question);
    }

    // Videeo 34 :Delete Question  
     public deleteQuestion(questionId:any)
    {
     return this._http.delete(`${baseUrl}/question/${questionId}`);
    }

  
  //VDIEO : 44 
  public evalQuiz(questions:any)
  {
return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }




}
