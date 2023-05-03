import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linguas',
  templateUrl: './linguas.component.html',
  styleUrls: ['./linguas.component.scss']
})
export class LinguasComponent implements OnInit {
  item = 'pt';
  constructor() { }

  ngOnInit(): void {
  }

}
