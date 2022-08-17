import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptor } from './interceptors/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuComponent } from './sharedcomponents/menu/menu.component';
import { DxButtonModule } from 'devextreme-angular';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxRadioGroupModule } from 'devextreme-angular';
import { DxListModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxTemplateModule } from 'devextreme-angular';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DxLoadPanelModule } from 'devextreme-angular';
import { DxDropDownBoxModule } from 'devextreme-angular';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import {
  DxDropDownButtonModule
} from 'devextreme-angular';
import {
  DxValidatorModule,
  DxValidationSummaryModule
} from 'devextreme-angular';
import { DxToastModule } from 'devextreme-angular';
import {
  DxButtonGroupModule,
  DxHtmlEditorModule
} from 'devextreme-angular';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { DxTagBoxModule } from 'devextreme-angular/ui/tag-box';
import { AssesmentsComponent } from './pages/assesments/assesments.component';
import { ContentsComponent } from './pages/contents/contents.component';
import { CategoriesComponent } from './pages/categories/categories.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    DashboardComponent,
    AssesmentsComponent,
    ContentsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DxTemplateModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,
    DxToolbarModule,
    DxValidatorModule,
    DxDrawerModule,
    DxDropDownBoxModule,
    DxValidationSummaryModule,
    DxLoadPanelModule,
    DxListModule,
    DxDropDownButtonModule,
    DxRadioGroupModule,
    DxToastModule,
    DxButtonGroupModule,
    DxLoadIndicatorModule,
    DxHtmlEditorModule,
    DxNumberBoxModule,
    DxTagBoxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
