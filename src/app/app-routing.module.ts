import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import { AdminDesboardComponent } from './admin-desboard/admin-desboard.component';
import { ReportComponent } from './report/report.component';
import { AdminSetupComponent } from './admin-setup/admin-setup.component';
import { MainPageComponent } from './main-page/main-page.component';
import { OccurrenceReportComponent } from './occurrence-report/occurrence-report.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'submit',component:SubmitPageComponent},
  {path:'desboard',component:AdminDesboardComponent},
  {path:'report',component:ReportComponent},
  {path:'admin_setring',component:AdminSetupComponent},
  {path:'main',component:MainPageComponent},
  {path:'occurrence_report',component:OccurrenceReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }