import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { UserModel, AuthService } from "src/app/modules/auth";
import { MessagesService } from "src/app/services/base/messages/messages.service";
import { UsersService } from "src/app/services/base/users/users.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-personal-information",
  templateUrl: "./personal-information.component.html",
  styleUrls: ["./personal-information.component.scss"],
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: any;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  avatarPic = "none";
  isLoading$: Observable<boolean>;
  image: any;
  user$: Observable<UserModel> | any;

  constructor(
    private userService: AuthService,
    private fb: FormBuilder,
    private service: UsersService,
    private messages: MessagesService
  ) {}

  ngOnInit(): void {
    const sb = this.userService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user))
      .subscribe((user) => {
        this.user = user.data;
        if (this.user.imagem.indexOf(environment.urlUploads) == -1) {
          this.image = `${environment.urlUploads}${this.user.imagem}`;
        } else {
          this.image = this.user.imagem ? this.user.imagem : "";
        }

        this.firstUserState = Object.assign({}, user);
        this.loadForm();
      });

    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      imagem: [this.user.imagem],
      primeiro_nome: [this.user.primeiro_nome, Validators.required],
      telefone: [this.user.telefone, Validators.required],
      email: [
        this.user.email,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  async save() {
    this.messages.swalLoading();

    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      this.messages.toastError();
      return;
    }

    this.formGroup.value.newImage = this.user.newImage;
    const response = await this.service.update(
      this.user.id,
      this.formGroup.value
    );
    if (response.message == "success") {
      this.user$.imagem = "../assets/media/users/default.jpg";
      this.messages.toastSuccess();
      return;
    }
    this.messages.toastError();
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
