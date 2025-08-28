

import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable, of } from 'rxjs';
import { SettingsService } from './settings.service';


@Injectable({
    providedIn: 'root'
})


export class AuthService {

    constructor(private msalService: MsalService, private setting: SettingsService) { }

    get isAuthenticated$(): Observable<boolean> {
        const usuario = sessionStorage.getItem('usuario');
        return of(!!usuario);
        //return of(this.msalService.instance.getActiveAccount() !== null);
    }

    get isDocente$(): Observable<boolean> {
        return of(this.setting.obtenerPerfil().filter((x: any) => x.perfil === 'docente').length > 0 || false);
    }

    get isDoa$(): Observable<boolean> {
        return of(this.setting.obtenerPerfil().filter((x: any) => x.perfil === 'doa').length > 0 || false);
    }

    get isOperadorRrhh$(): Observable<boolean> {
        return of(this.setting.obtenerPerfil().filter((x: any) => x.perfil === 'operador-rrhh').length > 0 || false);
    }

    get isDirectorRrhh$(): Observable<boolean> {
        return of(this.setting.obtenerPerfil().filter((x: any) => x.perfil === 'director-rrhh').length > 0 || false);
    }

    getUserRoles(): Observable<string[]> {
        return of([this.setting.obtenerPerfil()]);
    }
}
