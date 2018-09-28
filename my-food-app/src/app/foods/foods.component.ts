import { Component, OnInit } from '@angular/core';
import {Food} from '../food';
import {FOODS} from '../mock-foods';
import {FoodService} from '../food.service';



@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {


  foods: Food[];
  
  
  
  constructor(private foodService: FoodService) { }

  ngOnInit() {
	this.getFoods();
  }
  
  
 
  
  getFoods(): void{
	this.foodService.getFoods()
		.subscribe(foods => this.foods = foods);
}

}

