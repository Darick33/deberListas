import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

// Define la estructura de una tarea
export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'completada';
}

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private readonly STORAGE_KEY = 'tareas';

  constructor() {}

  async getAllTareas(): Promise<Tarea[]> {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    return value ? JSON.parse(value) : [];
  }
    async searchTareas(query: string): Promise<Tarea[]> {
      const tareas = await this.getAllTareas();
      return tareas.filter(
        (tarea) =>
          tarea.titulo.toLowerCase().includes(query.toLowerCase()) ||
          tarea.descripcion.toLowerCase().includes(query.toLowerCase())
      );
    }

  async saveTareas(tareas: Tarea[]): Promise<void> {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(tareas),
    });
  }

  async addTarea(tarea: Tarea): Promise<void> {
    const tareas = await this.getAllTareas();
    tareas.push(tarea);
    await this.saveTareas(tareas); 
  }

  async getTareaById(id: string): Promise<Tarea | undefined> {
    const tareas = await this.getAllTareas();
    return tareas.find((t) => t.id === id);
  }

  async updateTarea(id: string, updatedTarea: Tarea): Promise<void> {
    const tareas = await this.getAllTareas();
    const index = tareas.findIndex((t) => t.id === id);
    if (index !== -1) {
      tareas[index] = updatedTarea; 
      await this.saveTareas(tareas);
    }
  }

  async deleteTarea(id: string): Promise<void> {
    const tareas = await this.getAllTareas();
    const updatedTareas = tareas.filter((t) => t.id !== id);
    await this.saveTareas(updatedTareas); 
  }
}
