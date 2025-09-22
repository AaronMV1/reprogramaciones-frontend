

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


    sesionListaPerfil: any[] = [];


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


    ngOnInit(): void {


    }


    ngAfterViewInit(): void { }


    isLoggedIn(): boolean {
        return this.msalService.instance.getAllAccounts().length > 0;
    }


    private async consultarPerfilUsuario() {


        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';


        const req = {
            correo: this._settingsService.obtenerEmailUsuario(),
        };


        const headers = {
            country: 'PE',
            provider: 'integracion',
            apiKey: environment.ENDPOINTS.API_PERSONA_KEY,
        };



        this._http.postInformacion(req, 'api/v1/integracion/academico/obtener-informacion-persona', headers).subscribe({


            next: (res1: InformacionPersona) => {


                if (res1.result.resultado === 'OK') {
                    
                    let req2 = {
                        correo: this._settingsService.obtenerEmailUsuario()
                    }


                    this._http.post(req2, baseKey, 'login-consultar-usuario').subscribe(

                        (res2) => {

                            this.crearPerfilStorage(res1, res2);

                        }

                    )

                } else {

                    console.log("Usuario NO encontrado");

                }

            },

            error: (err: any) => {

                console.error('Error en consulta de usuario:', err);

                Swal.fire({
                    title: 'Información',
                    text: 'Algo salió mal, intenta de nuevo en unos momentos.',
                    icon: 'info',
                });

            },

        });

    }


    private async crearPerfilStorage(res1: any, res2: any) {


        let pfEmplID, pfApellidos, pfNombres, pfCorreo, pfCorreo2, pfPerfil, pfPrograma;


        pfEmplID = res1.result.emplID;
        pfApellidos = res2.lista[0].apellidos;
        pfNombres = res2.lista[0].nombres;
        pfCorreo = res2.lista[0].correo;
        pfCorreo2 = res2.lista[0].correo.slice(0, -13);
        pfPerfil = res2.lista[0].perfil;
        pfPrograma = res2.lista[0].programa;


        const perfil = {
            empleadoID: pfEmplID,
            apellidos: pfApellidos,
            nombres: pfNombres,
            correo: pfCorreo,
            correo2: pfCorreo2,
            perfil: pfPerfil,
            programa: pfPrograma,
        }


        this.sesionListaPerfil.push(perfil);


        sessionStorage.setItem('perfil', JSON.stringify(this.sesionListaPerfil));


        if (pfPerfil === 'DOA') {
            this._router.navigate(['/u/doa/inicio'], { replaceUrl: true });
        } else if (pfPerfil === 'Docente') {
            this._router.navigate(['/u/docente/inicio'], { replaceUrl: true });
        } else {
            this._router.navigate(['/modal'], { replaceUrl: true });
        }



    }

    
}
