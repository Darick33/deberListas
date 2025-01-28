import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tarea, TareaService } from '../servicios/tareas.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  standalone: false,
})
export class CrearTareaPage implements OnInit {
  tarea: Tarea = {
    id: '',
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
  };

  constructor(
    private tareaService: TareaService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // Obtener el ID del query parameter
    const id = this.route.snapshot.queryParamMap.get('id');
    console.log('ID recibido:', id);
    
    // Si hay un ID, buscar la tarea existente
    if (id) {
      try {
        const tareaExistente = await this.tareaService.getTareaById(id);
        console.log('Tarea encontrada:', tareaExistente);

        if (tareaExistente) {
          this.tarea = tareaExistente;
        } else {
          console.error('No se encontró ninguna tarea con este ID.');
        }
      } catch (error) {
        console.error('Error al buscar la tarea:', error);
      }
    }
  }

  async guardarTarea() {
    try {
      if (this.tarea.id) {
        // Si la tarea tiene un ID, se actualiza
        await this.tareaService.updateTarea(this.tarea.id, this.tarea);
      } else {
        // Si no tiene ID, se crea una nueva tarea
        this.tarea.id = Date.now().toString();
        await this.tareaService.addTarea(this.tarea);
      }
      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  }
}
