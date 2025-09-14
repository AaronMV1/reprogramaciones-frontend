

import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})


export class HeaderComponent implements OnInit {


    sesionListaPerfil: any[] = [];


    usuarioNombre: string = '';
    usuarioCorreo: string = '';
    usuarioPerfil: string = '';


    constructor(
        public _http: HttpService,
        private _router: Router,
        private messageService: MessageService
    ) {
        console.log('Constructor ejecutado');
    }


    ngOnInit(): void {

        const perfilGuardado = sessionStorage.getItem('perfil');
        this.sesionListaPerfil = perfilGuardado ? JSON.parse(perfilGuardado) : [];

        this.usuarioNombre = this.sesionListaPerfil[0].nombres + ' ' + this.sesionListaPerfil[0].apellidos;
        this.usuarioCorreo = this.sesionListaPerfil[0].correo;
        this.usuarioPerfil = this.sesionListaPerfil[0].perfil;

    }


    redirigirLogin() {
        this._router.navigate(['/login'], { replaceUrl: true });
    }

}

