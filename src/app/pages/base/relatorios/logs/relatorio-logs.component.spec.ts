import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioLogsComponent } from './relatorio-logs.component';

describe('RelatorioLogsComponent', () => {
  let component: RelatorioLogsComponent;
  let fixture: ComponentFixture<RelatorioLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
