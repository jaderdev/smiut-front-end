import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-sensores',
  templateUrl: './relatorio-sensores.component.html',
  styleUrls: ['./relatorio-sensores.component.scss']
})
export class RelatorioSensoresComponent implements OnInit {
  page: string = "sensores";
  constructor() {
  }

  ngOnInit() {

  }
}
