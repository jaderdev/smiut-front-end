import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./_layout/layout.component";
import { SensoresListComponent } from "./sensores/sensores-list.component";
import { SensoresNewComponent } from "./sensores/new/sensores-new.component";
import { SensoresEditComponent } from "./sensores/edit/sensores-edit.component";
import { FuncionariosListComponent } from "./empresas/funcionarios/funcionarios-list.component";
import { FuncionariosNewComponent } from "./empresas/funcionarios/new/funcionarios-new.component";
import { FuncionariosEditComponent } from "./empresas/funcionarios/edit/funcionarios-edit.component";
import { EmpresasListComponent } from "./empresas/empresas-list.component";
import { EmpresasNewComponent } from "./empresas/new/empresas-new.component";
import { EmpresasEditComponent } from "./empresas/edit/empresas-edit.component";
import { RelatorioLogsComponent } from "./base/relatorios/logs/relatorio-logs.component";
import { CadastrosComponent } from "./cadastros/cadastros.component";
import { RelatoriosSensorIntervaloTempoComponent } from "./base/relatorios/sensores/relatorios-sensor-intervalo-tempo/relatorios-sensor-intervalo-tempo.component";
import { RelatoriosSensorMediaComponent } from "./base/relatorios/sensores/relatorios-sensor-media/relatorios-sensor-media.component";
import { DadosEmpresaComponent } from "./base/dados-empresa/dados-empresa.component";
import { SensoresAllComponent } from "./sensores/all/sensores-all.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./base/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "cadastros",
        children: [
          { path: "", component: CadastrosComponent },
        ],
      },

      {
        path: "funcionarios",
        redirectTo: "empresas/funcionarios",
      },
      {
        path: "dados-empresa",
        component: DadosEmpresaComponent
      },
      {
        path: "empresas",
        children: [
          { path: "", component: EmpresasListComponent },
          { path: "new", component: EmpresasNewComponent },
          { path: "edit/:id", component: EmpresasEditComponent },
          {
            path: "funcionarios",
            children: [
              { path: "", component: FuncionariosListComponent },
              { path: "new", component: FuncionariosNewComponent },
              { path: "edit/:id", component: FuncionariosEditComponent },]
          },
        ],
      },
      {
        path: "sensores",
        children: [
          { path: "", component: SensoresListComponent },
          { path: "new", component: SensoresNewComponent },
          { path: "all", component: SensoresAllComponent },
          { path: "edit/:id", component: SensoresEditComponent },
        ],
      },
      {
        path: "tasmota",
        children: [
          { path: "", component: SensoresListComponent },
          { path: "new", component: SensoresNewComponent },
          { path: "all", component: SensoresAllComponent },
          { path: "edit/:id", component: SensoresEditComponent },
        ],
      },
      {
        path: "relatorios",
        children: [
          { path: "logs", component: RelatorioLogsComponent },
          { path: "sensores/media", component: RelatoriosSensorMediaComponent },
          { path: "sensores/intervalo", component: RelatoriosSensorIntervaloTempoComponent },
        ],
      },

      {
        path: "perfil",
        loadChildren: () =>
          import("../pages/base/perfil/user-profile.module").then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        redirectTo: "error/404",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
