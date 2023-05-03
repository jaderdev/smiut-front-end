import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-buttons',
  templateUrl: './top-buttons.component.html',
  styleUrls: ['./top-buttons.component.scss']
})
export class TopButtonsComponent implements OnInit {

  @Input() options: any;
  @Input() form: any;
  @Output() stayOnPage = new EventEmitter();
  page: any;
  type: string;

  constructor() {
  }

  ngOnInit(): void {
    this.verifyLink();
  }

  verifyLink() {
    if (location.href.includes('new')) {
      this.type = "Novo";
      return;
    }
    if (location.href.includes('edit')) {
      this.type = "Editar";
      return;
    }
    this.type = "";
  }
  backPage() {
    window.history.back()
  }
}
