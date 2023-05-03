import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel, AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  user$: Observable<UserModel>  | any;
  constructor(public userService: AuthService) {
    this.userService.currentUserSubject.asObservable().subscribe((data: any)=>{
      this.user$ = data.data;
    });
  }

  ngOnInit(): void {
    if(!this.user$.imagem){
      this.user$.imagem = "../assets/media/users/default.jpg";
    }
  }
  
}
