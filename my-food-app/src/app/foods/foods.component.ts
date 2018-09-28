import { Component, OnInit } from '@angular/core';
import {Food} from '../food';
import {FOODS} from '../mock-foods';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {


  foods = FOODS;
  selectedFood: Food;
  
  
  constructor() { }

  ngOnInit() {
  }
  
  
  onSelect(food: Food): void {
	this.selectedFood = food;
  }

}

