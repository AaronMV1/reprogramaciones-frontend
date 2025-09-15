

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { InicioComponent as DoaInicioComponent } from './doa/inicio/inicio.component';
import { InicioComponent as DocenteInicioComponent } from './docente/inicio/inicio.component';


import { NgIconsModule } from '@ng-icons/core';
import { featherEye, featherFileText, featherSearch, featherArrowLeft, featherArrowRight, featherCalendar, featherXCircle, featherClock, featherUpload, featherFilePlus, featherSettings, featherSave, featherUsers, featherPlusCircle, featherPlus, featherX, featherArrowUp, featherRotateCcw, featherFilter, featherLayers } from '@ng-icons/feather-icons';
import { LoginComponent } from './aplicacion/login/login.component';
import { MsalComponent } from './aplicacion/msal/msal.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule } from '@angular/platform-browser';
import { CatchaComponent } from './test/catcha/catcha.component';


import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { CalendarioComponent } from './docente/calendario/calendario.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfiguracionComponent } from './doa/configuracion/configuracion.component';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalComponent } from './aplicacion/modal/modal.component';


@NgModule({

    declarations: [
        LoginComponent,
        MsalComponent,
        ModalComponent,
        DoaInicioComponent,
        DocenteInicioComponent,
        CalendarioComponent,
        CatchaComponent,
        ConfiguracionComponent,
        ModalComponent,
    ],

    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        BrowserModule,
        FullCalendarModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        BrowserAnimationsModule,
        MessageModule,
        ToastModule,
        MatProgressSpinnerModule,
        NgIconsModule.withIcons({ featherFileText, featherSearch, featherEye, featherArrowLeft, featherArrowRight, featherCalendar, featherXCircle, featherClock, featherUpload, featherFilePlus, featherSettings, featherSave, featherUsers, featherPlus, featherX, featherArrowUp, featherRotateCcw, featherFilter, featherLayers  }),
    ],

    exports: [
        LoginComponent,
        MsalComponent,
        ModalComponent,
        DoaInicioComponent,
        DocenteInicioComponent,
    ],

    providers: [
        MessageService
    ]

})


export class RoutesModule { }

