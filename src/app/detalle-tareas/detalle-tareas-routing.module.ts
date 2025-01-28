import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleTareasPage } from './detalle-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleTareasPageRoutingModule {}
