import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoresAllComponent } from './sensores-all.component';

describe('SensoresAllComponent', () => {
  let component: SensoresAllComponent;
  let fixture: ComponentFixture<SensoresAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensoresAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensoresAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
