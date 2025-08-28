

import { Component } from '@angular/core';


@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})


export class HeaderComponent {

    usuarioNombre: string = 'CHRISTIAN MORI VALDIVIA';
    usuarioCorreo: string = 'christian.mori@upsjb.edu.pe';
    usuarioPerfil: string = '';
    
}
