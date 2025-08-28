

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {


    const authService = inject(AuthService);
    const router = inject(Router);


    return authService.isAuthenticated$.pipe(

        tap((isAuthenticated: boolean) => {
            
            if (!isAuthenticated) {
                router.navigate(['/login'], {
                    queryParams: { returnUrl: state.url } // opcional: guardar URL actual
                });
            }

        }),

        map((isAuthenticated: boolean) => isAuthenticated),
        
        catchError(() => {
            router.navigate(['/login']);
            return of(false);
        })

    );
    

};
