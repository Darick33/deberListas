import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tareas',
    loadChildren: () => import('./tareas/tareas.module').then(m => m.TareasPageModule)
  },
  {
    path: 'detalle-tareas/:id',
    loadChildren: () => import('./detalle-tareas/detalle-tareas.module').then(m => m.DetalleTareasPageModule)
  },
  {
    path: 'crear-tarea',
    loadChildren: () => import('./crear-tarea/crear-tarea.module').then(m => m.CrearTareaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }