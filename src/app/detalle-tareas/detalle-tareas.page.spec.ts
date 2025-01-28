import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleTareasPage } from './detalle-tareas.page';

describe('DetalleTareasPage', () => {
  let component: DetalleTareasPage;
  let fixture: ComponentFixture<DetalleTareasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
