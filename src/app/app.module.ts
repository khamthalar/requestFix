import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmitPageComponent } from './submit-page/submit-page.component';
import { ReportComponent } from './report/report.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { AdminDesboardComponent } from './admin-desboard/admin-desboard.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminSetupComponent } from './admin-setup/admin-setup.component';
import { EditLogComponent } from './dialogs/edit-log/edit-log.component';
import { FixDetailComponent } from './dialogs/fix-detail/fix-detail.component';
import { ItemInfoComponent } from './dialogs/item-info/item-info.component';
import { UserSettingDialogComponent } from './dialogs/user-setting-dialog/user-setting-dialog.component';
import { FixPageComponent } from './fix-page/fix-page.component';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MessagingService } from './services/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DeviceDetectorModule } from 'ngx-device-detector';




@NgModule({
  declarations: [
    AppComponent,
    SubmitPageComponent,
    ReportComponent,
    DateAgoPipe,
    MainNavComponent,
    LoginComponent,
    HomeComponent,
    AddNewUserComponent,
    AdminDesboardComponent,
    AdminNavComponent,
    AdminSetupComponent,
    EditLogComponent,
    FixDetailComponent,
    ItemInfoComponent,
    UserSettingDialogComponent,
    FixPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    DeviceDetectorModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule
  ],
  exports: [CommonModule, MatToolbarModule, MatInputModule, MatTableModule],
  providers: [AuthService, AuthGuard,MessagingService,AsyncPipe],
  bootstrap: [AppComponent],
  entryComponents: [
    UserSettingDialogComponent,
    FixPageComponent,
    EditLogComponent,
    AddNewUserComponent,
    FixDetailComponent,
    ItemInfoComponent]
})
export class AppModule { }
