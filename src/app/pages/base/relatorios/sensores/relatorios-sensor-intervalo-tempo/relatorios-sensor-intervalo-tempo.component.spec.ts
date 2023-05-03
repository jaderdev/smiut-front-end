import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosSensorIntervaloTempoComponent } from './relatorios-sensor-intervalo-tempo.component';

describe('RelatoriosSensorIntervaloTempoComponent', () => {
  let component: RelatoriosSensorIntervaloTempoComponent;
  let fixture: ComponentFixture<RelatoriosSensorIntervaloTempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosSensorIntervaloTempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriosSensorIntervaloTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
