import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoresListComponent } from './sensores-list.component';

describe('SensoresListComponent', () => {
  let component: SensoresListComponent;
  let fixture: ComponentFixture<SensoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensoresListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
