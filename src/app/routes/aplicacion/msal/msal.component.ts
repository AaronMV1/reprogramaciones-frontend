

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import Swal from 'sweetalert2';
import { HttpService } from '../../../core/services/http.service';
import { SettingsService } from '../../../core/services/settings.service';
import { environment } from '../../../../environments/environment';
import { InformacionPersona, InformacionPersonaAcademica } from '../../../core/entities/informacion.persona';


@Component({
    selector: 'app-msal',
    standalone: false,
    templateUrl: './msal.component.html',
    styleUrl: './msal.component.css',
})


export class MsalComponent implements OnInit, AfterViewInit {


    listaPerfil: any [] = [];


    usuario = {
        codigo: '',
        usuario: '',
        perfil: '',
        data: [],
    };


    loginDisplay = false;


    constructor(
        private _router: Router,
        private _http: HttpService,
        private _settingsService: SettingsService,
        private msalService: MsalService
    ) { this.consultarPerfilUsuario(); }


    ngOnInit(): void { }


    ngAfterViewInit(): void { }


    isLoggedIn(): boolean {
        return this.msalService.instance.getAllAccounts().length > 0;
    }


    consultarPerfilUsuario() {

        //  Llamar al backend para determinar si es DOA o Docente.

        this._router.navigate(['/u/doa/inicio']);
        console.log("consultar perfil")

        //  Consultar informacion:
        console.log("correo:", this._settingsService.obtenerEmailUsuario());
        console.log("codigo:", this._settingsService.obtenerCodigo());
        console.log("usernm:", this._settingsService.obtenerUsuario());
        console.log("perfil:", this._settingsService.obtenerPerfil());

    }

}
