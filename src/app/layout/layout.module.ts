

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ContentFullComponent } from './content-full/content-full.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { FormsModule } from '@angular/forms';


@NgModule({

    declarations: [
        ContentFullComponent,
        HeaderComponent,
        FooterComponent,
        AsideComponent,
    ],

    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule
    ],

    exports: [
        ContentFullComponent,
        HeaderComponent,
        FooterComponent,
        AsideComponent,
    ]

})


export class LayoutModule { }

