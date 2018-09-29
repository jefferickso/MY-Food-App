import { Injectable } from '@angular/core';
import {Food} from './food';

import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


 const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foodsUrl = 'api/foods';

  constructor(
	private http: HttpClient,
	private messageService: MessagesService) { }
  
 
  
  
  
  
  addFood (food: Food): Observable<Food> {
	return this.http.post<Food>(this.foodsUrl, food, httpOptions).pipe(
		tap((food: Food) => this.log('added food w/ id=${food.id}')),
		catchError(this.handleError<Food>('addFood'))
	);
	
}


  deleteFood (food: Food): Observable<Food> {
	const id = typeof food === 'number' ? food : food.id;
	const url = '${this.foodsUrl}/${id}';
	
	return this.http.delete<Food>(url, httpOptions).pipe(
		tap(_ => this.log('deleted food id=${id}')),
		catchError(this.handleError<Food>('deleteFood'))
	);
  }
  
  searchFoods(term: string): Observable<Food[]> {
	if(!term.trim()) {
		//This helps with no matches
		return of([]);
	}
	return this.http.get<Food[]>('${this.foodsUrl}/${term}').pipe(
		tap(_ => this.log('found foods matching "${term}"')),
		catchError(this.handleError<Food[]>('searchFoods', []))
	);
  }
  
	
  getFoods(): Observable<Food[]>{
	return this.http.get<Food[]>(this.foodsUrl)
		.pipe(
			tap(foods => this.log('fetched foods')),
			catchError(this.handleError('getFoods', []))
			);
}
	
    getFoodNo404<Data>(id: number): Observable<Food> {
    const url = `${this.foodsUrl}/?id=${id}`;
    return this.http.get<Food[]>(url)
      .pipe(
        map(foods => foods[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} food id=${id}`);
        }),
        catchError(this.handleError<Food>(`getFood id=${id}`))
      );
  }
  
  getFood(id: number): Observable<Food> {
	const url = '${this.foodsUrl}/${id}';
	return this.http.get<Food>(url).pipe(
		tap(_ => this.log('fetched food id=${id}')),
		catchError(this.handleError<Food>('getFood id=${id}'))
	);
	
	
}


  updateFood (food: Food): Observable<any> {
	return this.http.put(this.foodsUrl, food, httpOptions).pipe(
		tap(_=> this.log('updated food id=${food.id}')),
		catchError(this.handleError<any>('updateFood'))
	);
}



  private handleError<T> (operation = 'operation', result?: T) {
	return (error: any): Observable<T> => {
	
		console.error(error);
		
		this.log('${operation} failed: ${error.message}');
		
		return of(result as T);
	};
	
}

  private log(message: string) {
	this.messageService.add('FoodService: ${message}');
	
  }
}
