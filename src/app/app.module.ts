import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { TaulaPrincipalComponent } from './dashboard/taula-principal/taula-principal.component';
import { authInterceptorProviders } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TaulesInferiorsComponent } from './dashboard/taules-inferiors/taules-inferiors.component';
import { TaulaAnadaComponent } from './dashboard/taules-inferiors/taula-anada/taula-anada.component';
import { TaulaTornadaComponent } from './dashboard/taules-inferiors/taula-tornada/taula-tornada.component';
import { TaulaAvuixavuiComponent } from './dashboard/taules-inferiors/taula-avuixavui/taula-avuixavui.component';
import { BotoAfegirRutaComponent } from './dashboard/taules-inferiors/boto-afegir-ruta/boto-afegir-ruta.component';
import { PopupCrearComponent } from './dashboard/popup-crear/popup-crear.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupCrearViatgeComponent } from './dashboard/popup-crear-viatge/popup-crear-viatge.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PopupCrearDireccioComponent } from './dashboard/popup-crear-direccio/popup-crear-direccio.component';
import { PopupCrearCamioComponent } from './dashboard/popup-crear-camio/popup-crear-camio.component';
import { PopupCrearRemolcComponent } from './dashboard/popup-crear-remolc/popup-crear-remolc.component';
import { PopupCrearXoferComponent } from './dashboard/popup-crear-xofer/popup-crear-xofer.component';
import { PopupModificarXoferComponent } from './dashboard/popup-modificar-xofer/popup-modificar-xofer.component';
import { PopupModificarCamioComponent } from './dashboard/popup-modificar-camio/popup-modificar-camio.component';
import { PopupModificarRemolcComponent } from './dashboard/popup-modificar-remolc/popup-modificar-remolc.component';
import { PopupModificarViatgeComponent } from './dashboard/popup-modificar-viatge/popup-modificar-viatge.component';
import { OrdenarPorExternoPipe } from './pipes/ordenar-por-externo.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import { PopupLlistaViatgesAmagatsComponent } from './dashboard/popup-llista-viatges-amagats/popup-llista-viatges-amagats.component'; // module import



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    TaulaPrincipalComponent,
    TaulesInferiorsComponent,
    TaulaAnadaComponent,
    TaulaTornadaComponent,
    TaulaAvuixavuiComponent,
    BotoAfegirRutaComponent,
    PopupCrearComponent,
    PopupCrearViatgeComponent,
    PopupCrearDireccioComponent,
    PopupCrearCamioComponent,
    PopupCrearRemolcComponent,
    PopupCrearXoferComponent,
    PopupModificarXoferComponent,
    PopupModificarCamioComponent,
    PopupModificarRemolcComponent,
    PopupModificarViatgeComponent,
    OrdenarPorExternoPipe,
    PopupLlistaViatgesAmagatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    NgxMultipleDatesModule
  ],
  providers: [ authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
