import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Food } from '../food';
import { FoodService } from '../food.service';


@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.css']
})
export class FoodSearchComponent implements OnInit {

	foods$: Observable<Food[]>;
	private searchTerms = new Subject<string>();
	
  constructor(private foodService: FoodService) { }
  
  search(term: string): void { 
	this.searchTerms.next(term);
  }

  ngOnInit(): void {
	this.foods$ = this.searchTerms.pipe(
	
	debounceTime(300),
	
	distinctUntilChanged(),
	
	switchMap((term: string) => this.foodService.searchFoods(term)),
	
	);
	
	
  }

}
