import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { LanguagesService } from '../../languages/languages.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(
    private languagesService: LanguagesService
  ) { }
  private MSG = this.languagesService.messages.app;
  TIMER: number = 1500;
  swalSuccess(msg: string = this.MSG.success, title: string = this.MSG.MSG_SUCCESS_TITLE) {
    Swal.close();
    Swal.fire({
      icon: "success",
      title: title,
      text: msg,
      timer: this.TIMER,
    })
  }
  swalError(msg: string = this.MSG.error, title: string = this.MSG.error_title) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: title,
      text: msg,
      timer: this.TIMER,
    })
  }
  toastSuccess(msg: string = this.MSG.success) {
    Swal.close();
    Swal.fire({
      icon: "success",
      title: msg,
      toast: true,
      showConfirmButton: false,
      position: 'top-end',
      timer: this.TIMER,
    })
  }
  toastError(msg: string = this.MSG.retry) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: msg,
      toast: true,
      showConfirmButton: false,
      position: 'top-end',
      timer: this.TIMER,
    })
  }

  toastLoading() {
    Swal.close();
    Swal.fire({
      toast: true,
      didOpen: () => {
        Swal.showLoading()
      },
      position: 'top-end',
    })
  }

  swalLoading(html: string = this.MSG.plese_wait, title: string = this.MSG.loading) {
    Swal.close();
    Swal.fire({
      title: title,
      html: html,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  swalClose() {
    Swal.close()
  }

  swalConfirm(msg: string = this.MSG.confirm, title: string = this.MSG.confirm_title) {
    return Swal.fire({
      title: title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    });
  }

  swalConfirmDelete(msg: string = this.MSG.delete_confirm, title: string = this.MSG.delete_title) {
    return Swal.fire({
      title: title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    });
  }
  swalConfirmDeleteAll(msg: string = this.MSG.delete_all_confirm, title: string = this.MSG.delete_all_title) {
    return Swal.fire({
      title: title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    });
  }
}
