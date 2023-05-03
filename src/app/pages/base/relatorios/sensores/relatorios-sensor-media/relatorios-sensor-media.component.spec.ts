import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosSensorMediaComponent } from './relatorios-sensor-media.component';

describe('RelatoriosSensorMediaComponent', () => {
  let component: RelatoriosSensorMediaComponent;
  let fixture: ComponentFixture<RelatoriosSensorMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosSensorMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriosSensorMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
