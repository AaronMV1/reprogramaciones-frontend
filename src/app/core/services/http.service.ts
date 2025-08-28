

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { InformacionPersona } from '../entities/informacion.persona';


@Injectable({
    providedIn: 'root'
})


export class HttpService {


    constructor(private http: HttpClient) { }


    public get(collection: string): Observable<any> {


        const isFullUrl = collection.startsWith('http') || collection.startsWith('/api');
        const url = isFullUrl ? collection : environment.ENDPOINTS.API_SERVICIOS + collection;


        const httpOptions = {

            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),

        };

        return this.http.get<any[]>(url, httpOptions).pipe(

            tap((data: any) => {

            }),

            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),

        );

    }

    public getWithHeaders(collection: string, customHeaders: { [header: string]: string }): Observable<any> {

        const isFullUrl = collection.startsWith('http') || collection.startsWith('/api');
        const url = isFullUrl ? collection : environment.ENDPOINTS.API_SERVICIOS + collection;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                ...customHeaders
            }),
        };

        return this.http.get<any>(url, httpOptions).pipe(

            tap((data: any) => {
                
            }),

            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),

        );
        
    }

    public post(req: any, collection: string): Observable<any> {

        const jsonrequest = JSON.stringify(req);

        const isFullUrl = collection.startsWith('http');
        const url = isFullUrl ? collection : environment.ENDPOINTS.API_SERVICIOS + collection;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.post<any>(url, jsonrequest, httpOptions).pipe(

            tap((data: any) => {

            }),

            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),

        );

    }

    public postWithHeaders(req: any, collection: string, customHeaders: { [header: string]: string }): Observable<any> {

        const jsonrequest = JSON.stringify(req);

        const isFullUrl = collection.startsWith('http');
        const url = isFullUrl ? collection : environment.ENDPOINTS.API_SERVICIOS + collection;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                ...customHeaders
            }),
        };

        return this.http.post<any>(url, jsonrequest, httpOptions).pipe(

            tap((data: any) => {

            }),

            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),

        );

    }

    public postInformacion(req: any, collection: string, customHeaders: { [header: string]: string }): Observable<InformacionPersona> {

        const jsonrequest = JSON.stringify(req);

        // Condición para que si collection ya viene como URL completa (empieza con http), entonces no le agregue el environment.ENDPOINTS.API_SERVICIOS
        const isFullUrl = collection.startsWith('http');
        const url = isFullUrl ? collection : environment.ENDPOINTS.API_PERSONA + collection;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                ...customHeaders
            }),
        };

        return this.http.post<any>(url, jsonrequest, httpOptions).pipe(

            tap((data: any) => {

            }),

            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),
        );

    }


}

