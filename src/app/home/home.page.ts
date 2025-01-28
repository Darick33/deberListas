import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tarea, TareaService } from '../servicios/tareas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tareas: Tarea[] = [];
  cargando = false;

  constructor(
    @Inject(TareaService) private tareaService: TareaService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.cargando = true;
    this.tareas = await this.tareaService.getAllTareas();

    if (this.tareas.length === 0) {
      const tareasPredefinidas: Tarea[] = [
        { id: '1', titulo: 'Comprar materiales', descripcion: 'Comprar papel y tinta', estado: 'pendiente' },
        { id: '2', titulo: 'Revisar correos', descripcion: 'Responder emails pendientes', estado: 'pendiente' },
        { id: '3', titulo: 'Reunión con equipo', descripcion: 'Discutir proyecto en curso', estado: 'completada' },
        { id: '4', titulo: 'Planificar vacaciones', descripcion: 'Elegir fechas y destino', estado: 'pendiente' },
        { id: '5', titulo: 'Actualizar software', descripcion: 'Actualizar versión de sistemas', estado: 'pendiente' },
      ];
      for (const tarea of tareasPredefinidas) {
        await this.tareaService.addTarea(tarea);
      }
      this.tareas = await this.tareaService.getAllTareas();
    }
    this.cargando = false;
  }

  irACrear() {
    this.navCtrl.navigateForward('/crear-tarea');
  }

  verDetalles(id: string) {
    this.navCtrl.navigateForward(`/detalle-tareas/${id}`);
  }

  async eliminarTarea(id: string) {
    await this.tareaService.deleteTarea(id);
    this.tareas = await this.tareaService.getAllTareas();
  }

  async buscarTareas(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      this.tareas = await this.tareaService.getAllTareas();
    } else {
      this.tareas = await this.tareaService.searchTareas(query);
    }
  }
}