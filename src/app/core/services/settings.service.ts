

import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})


export class SettingsService {


    constructor(private authService: MsalService) { }


    obtenerEmailUsuario(): string {

        if (environment.initialAuth) {
            return environment.initialAuth;
        }

        if (this.authService.instance.getAllAccounts().length > 0) {
            return this.authService.instance.getAllAccounts()[0].username;
        }

        return 'no';

    }

    obtenerPerfil() {

        const usuario: any = sessionStorage.getItem('usuario');

        if (usuario !== null) {
            let item = JSON.parse(usuario);
            return item.perfil;
        }

    }

    obtenerCodigo() {

        const usuario: any = sessionStorage.getItem('usuario');

        if (usuario !== null) {
            let item = JSON.parse(usuario);
            return item.codigo;
        }

    }

    obtenerUsuario() {

        const usuario: any = sessionStorage.getItem('usuario');

        if (usuario !== null) {
            let item = JSON.parse(usuario);
            return item.usuario;
        }
        
    }
    
}
