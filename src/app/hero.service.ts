
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

/* import { HEROES } from './mock-heroes'; */
import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; 

  constructor(private messageService: MessageService,private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    //todo: send the message after the fetching of heroes
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes',[]))
    );
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    const url=`${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
     );
  }

  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_=>this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes',[]))
    );
  }

  ///////////save methods////////////////////
  updateHero(hero:Hero):Observable<any> {
    return this.http.put(this.heroesUrl,hero,httpOptions).pipe(
      tap(_=>this.log(`updated hero id=${hero.id}`)), 
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero:Hero):Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl,hero,httpOptions).pipe(
      tap(_=>this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero:Hero | number):Observable<Hero> {
    const id= typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url,httpOptions).pipe(
      tap(_=> this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }



  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add('HeroService: ' + message);
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}

/* getHeroes(): Observable<Hero[]> {
  //todo: send the message after the fetching of heroes
  this.messageService.add('HeroService: fetched heroes');
  return of(HEROES);
}

getHero(id: number): Observable<Hero> {
  // TODO: send the message _after_ fetching the hero
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(HEROES.find(hero => hero.id == id));
} */
