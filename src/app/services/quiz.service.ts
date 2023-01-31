import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {




  constructor(private _http:HttpClient) { }

public quizzes(){
  return this._http.get(`${baseUrl}/quiz/`);
}

//method to add the quiz 

public addQuiz(quiz:any)
{
  return  this._http.post(`${baseUrl}/quiz/`,quiz)
}


//delete Quiz  : refer to handler method api in springboot backend.
public deleteQuiz(qId:any)
{
return this._http.delete(`${baseUrl}/quiz/${qId}`);
}

// get the single quiz , to be displayed during the update quiz 

public getQuiz(qId:any)
{
  return this._http.get(`${baseUrl}/quiz/${qId}`);
}

// Update quiz method
public updateQuiz(quiz:any)
{
return this._http.put(`${baseUrl}/quiz/`,quiz);
}


//get quizes of category ,  seperately defined the api in the backend.
// VIDEO 37 : Defined this function explicity in contoller , service , impl , repository .;
public getQuizzesOfCategory(cid :any)
{
  return this._http.get(`${baseUrl}/quiz/category/${cid}`);
}


// Video 38 :  First define thes methods in the backend Controllers -> Service -> 

//To get all active quiz
  public getActiveQuizzes()
  {
    return this._http.get(`${baseUrl}/quiz/active`);
  }
//To get only the active quiz of particular case.
  public getActiveQuizzesOfCategory(cid:any)
  {
       return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

  




}
