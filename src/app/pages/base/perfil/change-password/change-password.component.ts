import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel, AuthService, ConfirmPasswordValidator } from 'src/app/modules/auth';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { UsersService } from 'src/app/services/base/users/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: any;
  firstUserState: UserModel;
  subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;

  constructor(
    private userService: AuthService,
    private fb: FormBuilder,
    private messages: MessagesService,
    private service: UsersService,
    private element: ElementRef,
    private router: Router
  ) { }

  async verifyPassword() {
    let password = this.formGroup.value.currentPassword;
    const response = await this.service.verifyPassword(this.user.id, password);
    if (response.message == "error") {
      this.messages.swalError("password está incorreta");
      let input = this.element.nativeElement.querySelector("#currentPassword");
      input.value = "";
    }
  }
  ngOnInit(): void {
    const sb = this.userService.currentUserSubject.asObservable().pipe(
      first(user => !!user)
    ).subscribe(user => {
      this.user = user.data;
      this.firstUserState = Object.assign({}, user);
      this.loadForm();
    });
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  loadForm() {
    this.formGroup = this.fb.group({
      currentPassword: [this.user.password, Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  async save() {
    this.messages.swalLoading();

    this.formGroup.markAllAsTouched();
    if (!this.formGroup.valid) {
      this.messages.toastError();
      return;
    }
    let data = {
      password: this.formGroup.value.password
    }
    const response = await this.service.update(this.user.id, data);
    if (response.message == "success") {
      this.router.navigate(["perfil"]);
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

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
