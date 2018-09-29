import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods/foods.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';



const routes: Routes = [
		{path: 'foods', component: FoodsComponent},
		{path: 'dashboard', component: DashboardComponent},
		{path: '', redirectTo: '/dashboard', pathMatch: 'full'},
		{path: 'detail/:id', component: FoodDetailComponent},
];



@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
  
})
export class AppRoutingModule {

	
	
	
	
}
