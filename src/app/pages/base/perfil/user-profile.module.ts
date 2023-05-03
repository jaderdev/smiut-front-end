import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetsModule } from '../../../_metronic/partials/content/widgets/widgets.module';
import { DropdownMenusModule } from '../../../_metronic/partials/content/dropdown-menus/dropdown-menus.module';
import { UserProfileComponent } from './user-profile.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileCardComponent } from './_components/profile-card/profile-card.component';
import { GalleryModule } from '../../components/gallery/gallery.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    PersonalInformationComponent,
    AccountInformationComponent,
    ChangePasswordComponent,
    ProfileCardComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    UserProfileRoutingModule,
    DropdownMenusModule,
    NgbDropdownModule,
    NgbTooltipModule,
    WidgetsModule,
    GalleryModule
  ]
})
export class UserProfileModule { }
