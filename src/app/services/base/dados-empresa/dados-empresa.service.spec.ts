import { TestBed } from '@angular/core/testing';

import { DadosEmpresaService } from './dados-empresa.service';

describe('DadosEmpresaService', () => {
  let service: DadosEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
