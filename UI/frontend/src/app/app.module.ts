import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShowComponent } from './employee/show/show.component';
import { AddEditComponent } from './employee/add-edit/add-edit.component';
import { SharedService } from './shared.service';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './employee/profile/profile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ArrowComponent } from './assets/arrow/arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ShowComponent,
    AddEditComponent,
    ProfileComponent,
    PagenotfoundComponent,
    ArrowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
