import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoresNewComponent } from './sensores-new.component';

describe('SensoresNewComponent', () => {
  let component: SensoresNewComponent;
  let fixture: ComponentFixture<SensoresNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensoresNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensoresNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
