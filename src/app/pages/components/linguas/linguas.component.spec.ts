import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinguasComponent } from './linguas.component';

describe('LinguasComponent', () => {
  let component: LinguasComponent;
  let fixture: ComponentFixture<LinguasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinguasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinguasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
