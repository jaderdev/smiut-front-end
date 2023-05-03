import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class HtmlToPDFService {
  constructor() { }

  createByString(data: string, download: boolean = true, name: string = 'report') {
    const html = htmlToPdfmake(data);
    const documentDefinition = { content: html };
    if (download) {
      pdfMake.createPdf(documentDefinition).download(name);
      return;
    }
    pdfMake.createPdf(documentDefinition).open();
  }
}
