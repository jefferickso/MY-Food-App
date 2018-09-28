import { Injectable } from '@angular/core';
import {Food} from './food';
import {FOODS} from './mock-foods';
import { Observable, of } from 'rxjs';
import {MessagesService } from './messages.service';



@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private messageService: MessagesService) { }
  
  getFoods(): Observable<Food[]> {
	
	return of(FOODS);
}
}
