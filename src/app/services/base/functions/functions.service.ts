import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { thumbsNoImage } from 'src/environments/thumbs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private router: Router
  ) { }

  groupBy(xs, f) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  }
  setNoImage(data: any, field: string) {
    let aux = [...data];
    aux.map(a => {
      a[field] = a[field] ? a[field] : thumbsNoImage.all
    })
    return aux;
  }
  redirectNoData() {
    this.router.navigate(["/"]);
  }
  formatToBrDate(data: string) {
    const aux = new Date(data);
    return (aux.toLocaleDateString('pt-BR')).split('/').join('-');
  }
  beautifyURL(title: string) {
    return title
      .replace(/\s/g, "-")
      .replace(/-+/g, "-")
      .replace(/[^a-å0-9-]/gi, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
}
