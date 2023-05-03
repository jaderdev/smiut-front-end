import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosEditComponent } from './funcionarios-edit.component';

describe('FuncionariosEditComponent', () => {
  let component: FuncionariosEditComponent;
  let fixture: ComponentFixture<FuncionariosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionariosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionariosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
