import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserModel, AuthService } from 'src/app/modules/auth';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { SensoresService } from 'src/app/services/sensores/sensores.service';
import { onValue } from "firebase/database";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RelatoriosSensorIndividualComponent } from '../../base/relatorios/sensores/relatorios-sensor-individual/relatorios-sensor-individual.component';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';

@Component({
  selector: 'app-sensores-all',
  templateUrl: './sensores-all.component.html',
  styleUrls: ['./sensores-all.component.scss']
})
export class TasmotaAllComponent implements OnInit {
  page: string = "tasmota";
  items: any;
  itemsAux: any;
  selectedItems: any = [];
  searchChangeObserver: any;
  viewType: string = 'list';
  private _searchableFields = ["id", "nome", 'deviceid'];
  gaugeOptions = this.service.gaugeOptions;

  private _subscriptions: Subscription[] = [];
  checkedSelectAll: boolean;
  showLoadingSpinner: boolean = true;
  id: number = 0;
  user$: Observable<UserModel> | any;

  constructor(
    private service: SensoresService,
    private messages: MessagesService,
    private cdf: ChangeDetectorRef,
    private route: ActivatedRoute,
    private userService: AuthService,
    private firebaseService: FirebaseService,
    private modalService: NgbModal,
    private mongodb: MongodbService
  ) {

    this.userService.currentUserSubject.asObservable().subscribe((data: any) => {
      this.user$ = data.data;
    });
  }

  async ngOnInit(): Promise<void> {
    // this.route.params.subscribe(async (params: any) => {
    //   this.id = params["id"];
    //   this.items = await this.getData();
    //   if (this.items[0]?.id) {
    //     this.items.map((a: any) => a.ativo = a.ativo == 1);
    //     this.getRealtimeSensors();
    //     this.itemsAux = [...this.items];
    //   }
    //   this.showLoadingSpinner = false;
    //   this.cdf.detectChanges();
    // });

    console.log("Eu funciono aqui")

    let x = this.mongodb.recoverSensores("topico/SENSOR/RESULT");
    console.log(x)
  }

  getRealtimeSensors() {
    const realtimeData = this.firebaseService.getRef();
    onValue(realtimeData, (snapshot) => {
      const auxData = snapshot.val();
      let data: Object = {};

      Object.values(auxData)
        .filter((a: any) => a.sensores)
        .map((a: any) => Object.assign(data, a.sensores));

      if (!data) return;
      this.mergeRealtimeLocalData(data);
      this.cdf.detectChanges();
    });
  }

  mergeRealtimeLocalData(realtimeData: any) {
    this.items.map((item: any) => {
      const itemFirebase = realtimeData[item.deviceid];
      item.atual_temp = itemFirebase?.atual_temp;
      item.atual_umid = itemFirebase?.atual_umid;
      item.range = itemFirebase?.range;
      item.online = itemFirebase?.online;
      item.ativo = itemFirebase?.ativo;
    })
  }

  async getData() {
    let response = await this.service.getAll();
    response.map((item: any) => item.range = JSON.parse(item.range));
    return response;
  }

  async updateData(id: number, data: any) {
    let response = this.service.update(id, data);
    return response;
  }

  async delete(id: number) {
    let response = await this.service.delete(id);
    return response.message !== "error";
  }

  async switchChange(e: any, item: any, field: string = "ativo") {
    this.messages.toastLoading();
    let data = {};
    data[field] = e.srcElement.checked;
    let response = await this.updateData(item.id, data);

    if (response.message == "success") {
      this.messages.toastSuccess();
      this.itemsAux = [...this.items];
      return;
    }
    item[field] = !e.srcElement.checked;
    this.cdf.detectChanges();
    this.messages.toastError();
  }

  selectItem(e: any, item: any) {
    if (e.target.checked) {
      this.selectedItems.push(item);
      item.checked = true;
    } else {
      this.selectedItems = this.selectedItems.filter((a) => a.id != item.id);
      item.checked = false;
    }
  }

  selectAll(e: any) {
    this.items.map((a) => (a.checked = e.target.checked));
    if (e.target.checked) {
      this.selectedItems = this.items;
      return;
    }
    this.selectedItems = [];
  }

  filterByStatus(event: any) {
    let item = event.srcElement.value;
    this.items = [...this.itemsAux];
    if (item != "") {
      this.items = this.items.filter((a) => a.visivel == item);
    }
  }

  openModalSensor(item: any) {
    const modalRef = this.modalService.open(RelatoriosSensorIndividualComponent);
    modalRef.componentInstance.item = item;
  }
  async deleteChange(id_sensor: number): Promise<void> {
    let result = await this.messages.swalConfirmDelete();

    if (result.isDismissed) return;

    if (result.value) {
      this.messages.swalLoading();
      let response = await this.delete(id_sensor);
      if (response) {
        //Atualizar pelo javascript
        this.items = this.items.filter((a) => a.id !== id_sensor);
        this.itemsAux = [...this.items];

        this.selectedItems = this.selectedItems.filter((a) => a.id != id_sensor);

        this.cdf.detectChanges();
        this.messages.toastSuccess();

        return;
      }
    }
    this.messages.swalError();
  }

  async updateSensorValues(deviceid: string) {
    this.messages.swalLoading();

    const response = await this.service.updateSensorValues(deviceid);
    if (response.error) {
      this.messages.swalError();
      return;
    }
    this.messages.swalSuccess();

    return;
  }
  async deleteAll() {
    let result = await this.messages.swalConfirmDeleteAll();

    if (result.isDismissed) return;

    if (result.value) {
      this.messages.swalLoading();
      let ids = this.selectedItems.map((a) => a.id).join();
      let response = await this.delete(ids);
      if (response) {
        this.items = this.itemsAux.filter(
          (a) => !ids.split(",").includes(a.id)
        );
        this.itemsAux = [...this.items];

        this.selectedItems = [];
        this.checkedSelectAll = false;

        this.cdf.detectChanges();
        this.messages.toastSuccess();

        return;
      }
    }
    this.messages.swalError();
  }

  onSearchChange(searchValue: string) {
    let newArray;
    if (!this.searchChangeObserver) {
      Observable.create((observer) => {
        this.searchChangeObserver = observer;
      })
        .pipe(debounceTime(300))
        .pipe(distinctUntilChanged())
        .subscribe((response) => {
          response = response.toLowerCase();
          if (response == "") {
            newArray = this.itemsAux;
          } else {
            newArray = this.itemsAux.filter((a) =>
              this._searchableFields.some(
                (b) => a[b]?.toLowerCase().indexOf(response.toLowerCase()) > -1
              )
            );
          }
          this.items = newArray;
          this.cdf.detectChanges();
        });
    }
    this.searchChangeObserver.next(searchValue);
  }

  ngOnDestroy() {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }


}
