

import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-footer',
    standalone: false,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})


export class FooterComponent implements OnInit {

    anno: string = '';

    ngOnInit(): void {
        
        this.obtenerAnno()

    }

    obtenerAnno() {

        let fecha = new Date().getFullYear();

        this.anno = String(fecha);

    }

}
