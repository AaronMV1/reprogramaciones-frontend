

import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';


@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})


export class LoginComponent {

    constructor(
        private authService: MsalService,
        private _router: Router,
        private msalService: MsalService,
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private msalBroadcastService: MsalBroadcastService
    ) { }

    login() {
        localStorage.clear();
        sessionStorage.clear();
        this._router.navigate(['/inicio']);
    }

}
