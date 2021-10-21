import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantListPage } from './pages/plant-list/plant-list.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: PlantListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantsRoutingModule {}
