import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosSensorIndividualComponent } from './relatorios-sensor-individual.component';

describe('RelatoriosSensorIndividualComponent', () => {
  let component: RelatoriosSensorIndividualComponent;
  let fixture: ComponentFixture<RelatoriosSensorIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosSensorIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriosSensorIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
