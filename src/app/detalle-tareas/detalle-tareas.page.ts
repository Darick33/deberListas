import { Component, Input, OnInit } from '@angular/core';
import { Tarea, TareaService } from '../servicios/tareas.service';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-tareas',
  templateUrl: './detalle-tareas.page.html',
  styleUrls: ['./detalle-tareas.page.scss'],
  standalone: false 
})
export class DetalleTareasPage implements OnInit {

  tarea: Tarea | undefined;

  constructor(
    private modalCtrl: ModalController,
    private tareaService: TareaService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tarea = await this.tareaService.getTareaById(id);
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  editarTarea() {
    if (this.tarea) {
      this.navCtrl.navigateForward(`/crear-tarea?id=${this.tarea.id}`);
    }
  }

  async finalizarTarea() {
    if (this.tarea) {
      this.tarea.estado = 'completada';
      await this.tareaService.updateTarea(this.tarea.id, this.tarea);
      this.navCtrl.navigateBack('/home');
    }
  }
}