import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasetsComponent } from './containers/datasets.component';
import { DatasetDetailsComponent } from './dataset-details/containers/dataset-details.component';

const routes: Routes = [
  {
    path: '',
    component: DatasetsComponent,
  },
  {
    path: 'details/:id',
    component: DatasetDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasetsRoutingModule {}