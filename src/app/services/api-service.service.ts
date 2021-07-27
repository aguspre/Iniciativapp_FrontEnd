import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICharacter } from '../interfaces/icharacter';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  private baseUrl = 'https://localhost:44359/';
  private apiUrl = 'api/Characters';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getListCharacters(): Observable<ICharacter>{
      return this.http.get<ICharacter>(this.baseUrl + this.apiUrl);
  }

  getCharacterById(id: number): Observable<any>{
    return this.http.get<ICharacter>(this.baseUrl + this.apiUrl + "/" + id);
  }

  deleteCharacter(id:number): Observable<any>{
      return this.http.delete( this.baseUrl + this.apiUrl + "/" + id );
  }

  updateCharacter(id: number, character : any): Observable<any>{
      return this.http.put( this.baseUrl + this.apiUrl + "/" + id , character );
  }

  createCharacter(character:any): Observable<any>{
    return this.http.post(this.baseUrl + this.apiUrl ,character);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
