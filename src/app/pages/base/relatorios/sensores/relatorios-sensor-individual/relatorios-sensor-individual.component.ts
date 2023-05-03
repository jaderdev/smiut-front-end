import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { onValue } from 'firebase/database';
import { SensoresService } from 'src/app/services/sensores/sensores.service';

@Component({
  selector: 'app-relatorios-sensor-individual',
  templateUrl: './relatorios-sensor-individual.component.html',
  styleUrls: ['./relatorios-sensor-individual.component.scss']
})
export class RelatoriosSensorIndividualComponent implements OnInit {
  @Input() item: any;
  firebaseService: any;

  constructor(
    public activeModal: NgbActiveModal,
    private sensorsService: SensoresService,
    private cdf: ChangeDetectorRef,
  ) { }
  gaugeOptions = this.sensorsService.gaugeOptions;
  qty: number = 1;
  sensorsData: any = [];
  sensorsMinMax: any;
  private dataQty: number = 5;

  async ngOnInit(): Promise<void> {
    const link = `${this.item.empresa}/sensores/${this.item.deviceid}`;
    this.refreshData();
  }

  async refreshData() {
    const response = await this.sensorsService.getLastValuesByDeviceId(this.item.deviceid, this.dataQty);
    const sensorsPastDataAux = response.lastItems;
    this.sensorsMinMax = response.minMax;

    this.qty = sensorsPastDataAux.length > 0 ? sensorsPastDataAux.length - 1 : 0;
    this.item = sensorsPastDataAux[0];

    if (typeof (this.item.range) == 'string') {
      this.item.range = JSON.parse(this.item.range)
    }
    
    const aux = sensorsPastDataAux.slice(1, sensorsPastDataAux.length);
    this.sensorsData = sensorsPastDataAux;
    this.cdf.detectChanges();
  }

  getRealtimeSensors(link: string) {
    const realtimeData = this.firebaseService.getRef(link);
    onValue(realtimeData, (snapshot) => {
      this.refreshData();
    });
  }

  close() {
    this.activeModal.dismiss();
  }
}
