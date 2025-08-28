

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './routes/aplicacion/login/login.component';
import { MsalComponent } from './routes/aplicacion/msal/msal.component';

import { ContentFullComponent } from './layout/content-full/content-full.component';

import { InicioComponent as DoaInicioComponent } from './routes/doa/inicio/inicio.component';
import { InicioComponent as DocenteInicioComponent } from './routes/docente/inicio/inicio.component';

import { MsalGuard } from '@azure/msal-angular';
import { CatchaComponent } from './routes/test/catcha/catcha.component';
import { CalendarioComponent } from './routes/docente/calendario/calendario.component';
import { ConfiguracionComponent } from './routes/doa/configuracion/configuracion.component';


const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'catcha',
        component: CatchaComponent
    },

    {
        path: 'inicio',
        component: MsalComponent,
        data: {
            title: 'Redireccionando...',
        },
        canActivate: [MsalGuard],
    },

    {
        path: 'u',
        component: ContentFullComponent,
        children: [
            
            {
                path: 'doa',
                children: [
                    {
                        path: 'inicio',
                        component: DoaInicioComponent,
                    },
                    {
                        path: 'configuracion',
                        component: ConfiguracionComponent
                    }
                ]
            },

            {
                path: 'docente',
                children: [
                    {
                        path: 'inicio',
                        component: DocenteInicioComponent
                    },
                    {
                        path: 'calendario',
                        component: CalendarioComponent
                    }
                ]
            }

        ],
        canActivate: [MsalGuard],
    }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule { }

