import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioSensoresComponent } from './relatorio-sensores.component';

describe('RelatorioSensoresComponent', () => {
  let component: RelatorioSensoresComponent;
  let fixture: ComponentFixture<RelatorioSensoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioSensoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
