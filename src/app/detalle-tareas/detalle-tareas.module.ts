import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTareasPageRoutingModule } from './detalle-tareas-routing.module';

import { DetalleTareasPage } from './detalle-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTareasPageRoutingModule
  ],
  declarations: [DetalleTareasPage]
})
export class DetalleTareasPageModule {}
