import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantListPage } from './pages/plant-list/plant-list.page';
import { PlantsRoutingModule } from './plants-routing.module';

@NgModule({
  declarations: [PlantListPage],
  imports: [CommonModule, PlantsRoutingModule],
})
export class PlantsModule {}
