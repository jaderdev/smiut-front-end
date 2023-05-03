import { TestBed } from '@angular/core/testing';

import { HtmlToPDFService } from './html-to-pdf.service';

describe('HtmlToPDFService', () => {
  let service: HtmlToPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlToPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
