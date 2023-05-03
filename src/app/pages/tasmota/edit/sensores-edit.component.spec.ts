import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoresEditComponent } from './sensores-edit.component';

describe('SensoresEditComponent', () => {
  let component: SensoresEditComponent;
  let fixture: ComponentFixture<SensoresEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensoresEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensoresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
