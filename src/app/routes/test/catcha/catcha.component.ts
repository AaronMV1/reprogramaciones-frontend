

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-catcha',
    standalone: false,
    templateUrl: './catcha.component.html',
    styleUrl: './catcha.component.css'
})


export class CatchaComponent implements OnInit {

    constructor(private _http: HttpClient, private _router: Router) { }

    ngOnInit(): void { }

    resolved(token: any) {

        window.location.href = 'https://www.google.com/';

    }
}
