import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$: Observable<UserModel> | any;

  constructor(private layout: LayoutService, private auth: AuthService) {}

  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.auth.currentUserSubject.asObservable().subscribe((data: any)=>{
      this.user$ = data.data;
    });
    
    if(!this.user$.imagem){
      this.user$.imagem = "../assets/media/users/default.jpg";
    }else{
      this.user$.imagem = `${environment.urlUploads}${this.user$.imagem}`;
    }
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
