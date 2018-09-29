import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Food } from './food';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foods = [
		
		{id: 3, name: 'Fried Rice' },
		{id: 4, name: 'Chicken' },
		{id: 5, name: 'Pasta' },
		{id: 6, name: 'Hamburger' },
		{id: 7, name: 'Tacos' },
	
    ];
    return {foods};
  }


  genId(foods: Food[]): number {
    return foods.length > 0 ? Math.max(...foods.map(food => food.id)) + 1 : 7;
  }
}