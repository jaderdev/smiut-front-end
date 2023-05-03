import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasmotaAllComponent } from './sensores-all.component';

describe('SensoresAllComponent', () => {
  let component: TasmotaAllComponent;
  let fixture: ComponentFixture<TasmotaAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasmotaAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasmotaAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
