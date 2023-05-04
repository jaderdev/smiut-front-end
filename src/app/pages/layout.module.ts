import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InlineSVGModule } from "ng-inline-svg";
import { PagesRoutingModule } from "./pages-routing.module";
import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from "@ng-bootstrap/ng-bootstrap";
import { TranslationModule } from "../modules/i18n/translation.module";
import { LayoutComponent } from "./_layout/layout.component";
import { ScriptsInitComponent } from "./_layout/init/scipts-init/scripts-init.component";
import { HeaderMobileComponent } from "./_layout/components/header-mobile/header-mobile.component";
import { AsideComponent } from "./_layout/components/aside/aside.component";
import { FooterComponent } from "./_layout/components/footer/footer.component";
import { HeaderComponent } from "./_layout/components/header/header.component";
import { HeaderMenuComponent } from "./_layout/components/header/header-menu/header-menu.component";
import { TopbarComponent } from "./_layout/components/topbar/topbar.component";
import { ExtrasModule } from "../_metronic/partials/layout/extras/extras.module";
import { LanguageSelectorComponent } from "./_layout/components/topbar/language-selector/language-selector.component";
import { CoreModule } from "../_metronic/core";
import { SubheaderModule } from "../_metronic/partials/layout/subheader/subheader.module";
import { AsideDynamicComponent } from "./_layout/components/aside-dynamic/aside-dynamic.component";
import { HeaderMenuDynamicComponent } from "./_layout/components/header/header-menu-dynamic/header-menu-dynamic.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { SpinnerComponent } from "./_layout/components/spinner/spinner.component";

import { ImageCropperModule } from "ngx-image-cropper";
import { ColorChromeModule } from "ngx-color/chrome";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { LinguasComponent } from "./components/linguas/linguas.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { TopButtonsComponent } from "./components/top-buttons/top-buttons.component";
import { FilesUploadItemComponent } from "./components/files/files-upload-item/files-upload-item.component";
import { FilesUploadListComponent } from "./components/files/files-upload-list/files-upload-list.component";
import { GalleryModule } from "./components/gallery/gallery.module";
import { ImagePreloadModule } from "../directives/image-preload/image-preload.module";
import { SensoresListComponent } from './sensores/sensores-list.component';
import { SensoresNewComponent } from './sensores/new/sensores-new.component';
import { SensoresEditComponent } from './sensores/edit/sensores-edit.component';
import { FuncionariosEditComponent } from "./empresas/funcionarios/edit/funcionarios-edit.component";
import { FuncionariosListComponent } from "./empresas/funcionarios/funcionarios-list.component";
import { FuncionariosNewComponent } from "./empresas/funcionarios/new/funcionarios-new.component";
import { EmpresasEditComponent } from './empresas/edit/empresas-edit.component';
import { EmpresasListComponent } from "./empresas/empresas-list.component";
import { EmpresasNewComponent } from "./empresas/new/empresas-new.component";
import { RelatorioLogsComponent } from "./base/relatorios/logs/relatorio-logs.component";
import { RelatorioSensoresComponent } from "./base/relatorios/sensores/relatorio-sensores.component";
import { CadastrosComponent } from './cadastros/cadastros.component';
import { NgxGaugeModule } from "ngx-gauge";
import { RelatoriosSensorIntervaloTempoComponent } from './base/relatorios/sensores/relatorios-sensor-intervalo-tempo/relatorios-sensor-intervalo-tempo.component';
import { RelatoriosSensorMediaComponent } from './base/relatorios/sensores/relatorios-sensor-media/relatorios-sensor-media.component';
import { RelatoriosSensorIndividualComponent } from "./base/relatorios/sensores/relatorios-sensor-individual/relatorios-sensor-individual.component";
import { DadosEmpresaComponent } from "./base/dados-empresa/dados-empresa.component";
import { SensoresAllComponent } from "./sensores/all/sensores-all.component";
import { RouterModule } from "@angular/router";
import { TasmotaAllComponent } from './tasmota/all/tasmota-all.component'

@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,
    SpinnerComponent,
    LinguasComponent,
    TopButtonsComponent,
    FilesUploadItemComponent,
    FilesUploadListComponent,
    SensoresListComponent,
    SensoresNewComponent,
    SensoresEditComponent,
    SensoresAllComponent,
    FuncionariosListComponent,
    FuncionariosEditComponent,
    FuncionariosNewComponent,
    EmpresasListComponent,
    EmpresasEditComponent,
    EmpresasNewComponent,
    RelatorioLogsComponent,
    RelatorioSensoresComponent,
    CadastrosComponent,
    RelatoriosSensorIndividualComponent,
    RelatoriosSensorIntervaloTempoComponent,
    RelatoriosSensorMediaComponent,
    DadosEmpresaComponent,
    TasmotaAllComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    PagesRoutingModule,
    TranslationModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    SubheaderModule,
    MatChipsModule,
    MatFormFieldModule,
    ImageCropperModule,
    GalleryModule,
    ColorChromeModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
    MatButtonToggleModule,
    ImagePreloadModule,
    NgxGaugeModule,
    RouterModule
  ],
})
export class LayoutModule { }
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
