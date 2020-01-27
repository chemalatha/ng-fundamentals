import {Injectable} from '@angular/core';
import { ISession } from '../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class VoterService{
    constructor(private http:HttpClient){

    }
    deleteVoter(eventId:number,session:ISession,voterName){
        session.voters = session.voters.filter(v=>v!=voterName);
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`
        this.http.delete(url)
        .pipe(catchError(this.handleError('addVoter')))
        .subscribe();

    }
    addVoter(eventId:number,session:ISession,voterName){
        let options = {
            headers:new HttpHeaders({'Content-Type':'application/json'})
        }
        session.voters.push(voterName);
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`
        return this.http.post(url,{},options)
        .pipe(catchError(this.handleError('addVoter')))
        .subscribe();
    }
    userHasVoted(session:ISession,voterName){
        return session.voters.some(v => v===voterName);
    }  
    private handleError<T>(operation = 'operation',result?:T){
        return (error:any):Observable<T> =>{
          console.error(error);
          return of(result as T);
        }
      } 
}