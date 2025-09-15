

import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../core/services/http.service';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-configuracion',
    standalone: false,
    templateUrl: './configuracion.component.html',
    styleUrl: './configuracion.component.css'
})


export class ConfiguracionComponent implements OnInit {


    listaSemestre: any[] = [];
    listaUsuarios: any[] = [];
    usuariosFiltrados: any[] = [];


    popupUsuarioNombres = '';
    popupUsuarioApellidos = '';
    popupUsuarioCorreo = '';
    popupUsuarioPerfil = '';
    popupUsuarioPrograma = '';
    popupUsuarioBusqueda = '';


    popupSemestreGrado: string = '';
    popupSemestreCodGrado: string = '';
    popupSemestreSemestre: string = '';
    popupSemestreCodSemestre: string = '';
    popupSemestreFInicio: string = '';
    popupSemestreFCierre: string = '';


    limiteClase: any = '';
    plazoMaximo: any = '';
    checkboxDocente: boolean = false;
    checkboxAlumno: boolean = false;
    checkboxDOA: boolean = false;
    checkboxCoordinadorPrograma: boolean = false;
    checkboxCoordinadorAmbiente: boolean = false;


    constructor(
        private _router: Router,
        public _http: HttpService,
    ) { }


    ngOnInit(): void {

        this.consultarConfiguracion();
        this.consultarConfiguracionSemestre();

    }


    //#region       FUNCIONES


    redirigirInicio() {
        this._router.navigate(['/u/doa/inicio']);
    }

    restablecerPredeterminados() {

        this.limiteClase = 2;
        this.plazoMaximo = 7;
        this.checkboxDocente = true;
        this.checkboxAlumno = true;
        this.checkboxDOA = false;
        this.checkboxCoordinadorPrograma = false;
        this.checkboxCoordinadorAmbiente = false;

    }


    //#endregion


    //#region       SERVICIOS


    consultarConfiguracion() {


        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';


        this._http.get(baseKey, 'consultar-configuracion').subscribe(

            (res) => {

                this.limiteClase = res.lista[0].limiteReprogramaciones;
                this.plazoMaximo = res.lista[0].plazoMaximo;
                this.checkboxDocente = res.lista[0].correoDocente;
                this.checkboxAlumno = res.lista[0].correoAlumno;
                this.checkboxDOA = res.lista[0].correoDOA;
                this.checkboxCoordinadorPrograma = res.lista[0].correoCoordinadorPrograma;
                this.checkboxCoordinadorAmbiente = res.lista[0].correoCoordinadorAmbiente;

            }

        )


    }

    actualizarConfiguracion() {


        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';


        let req = {
            limiteReprogramaciones: this.limiteClase,
            plazoMaximo: this.plazoMaximo,
            correoDocente: this.checkboxDocente,
            correoAlumno: this.checkboxAlumno,
            correoDOA: this.checkboxDOA,
            correoCoordinadorPrograma: this.checkboxCoordinadorPrograma,
            correoCoordinadorAmbiente: this.checkboxCoordinadorAmbiente
        }


        this._http.post(req, baseKey, 'actualizar-configuracion').subscribe(

            (res) => {

                if (res.estado == "Success") {

                    this.consultarConfiguracion();

                    Swal.fire({

                        icon: 'success',
                        title: '¡Configuración Actualizada!',
                        text: 'La configuración ha sido actualizada correctamente',
                        allowOutsideClick: false,
                        customClass: {
                            popup: 'swal',
                            icon: 'swal-icon',
                            title: 'swal-title',
                            htmlContainer: 'swal-text',
                            confirmButton: 'swal-confirm-button',
                            cancelButton: 'swal-cancel-button'
                        }

                    });

                } else {

                    Swal.fire({

                        icon: 'error',
                        title: '¡Error al Actualizar!',
                        text: 'Ocurrió un error al actualizar la configuración',
                        allowOutsideClick: false,
                        customClass: {
                            popup: 'swal',
                            icon: 'swal-icon',
                            title: 'swal-title',
                            htmlContainer: 'swal-text',
                            confirmButton: 'swal-confirm-button',
                            cancelButton: 'swal-cancel-button'
                        }

                    });

                }

            }

        )

    }

    consultarListaUsuarios() {


        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';


        this._http.get(baseKey, 'consultar-lista-usuarios').subscribe(

            (res) => {
                this.listaUsuarios = [...res.lista];
                this.usuariosFiltrados = this.listaUsuarios;
            }

        )


    }

    registrarUsuario() {

        if (!this.popupUsuarioNombres || !this.popupUsuarioApellidos || !this.popupUsuarioPerfil || !this.popupUsuarioCorreo) {

            Swal.fire({
                icon: 'warning',
                title: '¡Campos Vacíos!',
                text: 'Por favor, complete todos los campos requeridos.',
                allowOutsideClick: false,
                customClass: {
                    popup: 'swal',
                    icon: 'swal-icon',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    cancelButton: 'swal-cancel-button'
                }
            });

            return;

        } else {


            this.popupUsuarioPerfil != 'Coordinador de Programa' ? this.popupUsuarioPrograma = '' : null;


            let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';


            let req = {
                nombres: this.popupUsuarioNombres,
                apellidos: this.popupUsuarioApellidos,
                correo: this.popupUsuarioCorreo,
                perfil: this.popupUsuarioPerfil,
                programa: this.popupUsuarioPrograma,
                usuarioResponsable: "12345"
            }


            this._http.post(req, baseKey, 'registrar-usuario').subscribe(

                (res) => {

                    if (res.estado == "Success") {

                        this.consultarListaUsuarios();

                        this.popupUsuarioNombres = '';
                        this.popupUsuarioApellidos = '';
                        this.popupUsuarioCorreo = '';
                        this.popupUsuarioPerfil = '';
                        this.popupUsuarioPrograma = '';

                        Swal.fire({

                            icon: 'success',
                            title: '¡Usuario Agregado!',
                            text: 'El usuario a sido registrado exitosamente',
                            allowOutsideClick: false,
                            customClass: {
                                popup: 'swal',
                                icon: 'swal-icon',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button',
                                cancelButton: 'swal-cancel-button'
                            }

                        })

                    } else if (res.estado == "Success2") {

                        this.consultarListaUsuarios();

                        this.popupUsuarioNombres = '';
                        this.popupUsuarioApellidos = '';
                        this.popupUsuarioCorreo = '';
                        this.popupUsuarioPerfil = '';
                        this.popupUsuarioPrograma = '';

                        Swal.fire({

                            icon: 'success',
                            title: '¡Usuario Reintegrado!',
                            text: 'El usuario a sido reintegrado exitosamente',
                            allowOutsideClick: false,
                            customClass: {
                                popup: 'swal',
                                icon: 'swal-icon',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button',
                                cancelButton: 'swal-cancel-button'
                            }

                        })

                    } else {

                        Swal.fire({

                            icon: 'warning',
                            title: '¡Usuario Encontrado!',
                            text: 'El usuario ingresado ya existe',
                            allowOutsideClick: false,
                            customClass: {
                                popup: 'swal',
                                icon: 'swal-icon',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button',
                                cancelButton: 'swal-cancel-button'
                            }

                        })

                    }

                }
            )

        }

    }

    actualizarUsuario() {

        if (!this.popupUsuarioNombres || !this.popupUsuarioApellidos || !this.popupUsuarioPerfil || !this.popupUsuarioCorreo) {

            Swal.fire({
                icon: 'warning',
                title: '¡Campos Vacíos!',
                text: 'Por favor, complete todos los campos requeridos.',
                allowOutsideClick: false,
                customClass: {
                    popup: 'swal',
                    icon: 'swal-icon',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    cancelButton: 'swal-cancel-button'
                }
            });

            return;

        } else {


            this.popupUsuarioPerfil != 'Coordinador de Programa' ? this.popupUsuarioPrograma = '' : null;


            let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';


            let req = {
                nombres: this.popupUsuarioNombres,
                apellidos: this.popupUsuarioApellidos,
                correo: this.popupUsuarioCorreo,
                perfil: this.popupUsuarioPerfil,
                programa: this.popupUsuarioPrograma,
            }


            this._http.post(req, baseKey, 'actualizar-usuario').subscribe(

                (res) => {

                    if (res.estado == "Success") {

                        this.consultarListaUsuarios();

                        this.popupUsuarioNombres = '';
                        this.popupUsuarioApellidos = '';
                        this.popupUsuarioPerfil = '';
                        this.popupUsuarioCorreo = '';

                        Swal.fire({

                            icon: 'success',
                            title: '¡Usuario Actualizado!',
                            text: 'El usuario a sido actualizado exitosamente',
                            allowOutsideClick: false,
                            customClass: {
                                popup: 'swal',
                                icon: 'swal-icon',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button',
                                cancelButton: 'swal-cancel-button'
                            }

                        });

                    } else {

                        Swal.fire({

                            icon: 'warning',
                            title: '¡Usuario No Encontrado!',
                            text: 'El usuario ingresado no existe',
                            allowOutsideClick: false,
                            customClass: {
                                popup: 'swal',
                                icon: 'swal-icon',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button',
                                cancelButton: 'swal-cancel-button'
                            }

                        });

                    }

                }

            )

        }

    }

    eliminarUsuario() {

        if (!this.popupUsuarioCorreo) {

            Swal.fire({
                icon: 'warning',
                title: '¡Campo Vacío!',
                text: 'Por favor, coloque el correo del usuario que desea eliminar.',
                allowOutsideClick: false,
                customClass: {
                    popup: 'swal',
                    icon: 'swal-icon',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    cancelButton: 'swal-cancel-button'
                }
            });

            return;

        } else {


            let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';


            let req = {
                correo: this.popupUsuarioCorreo
            }


            this._http.post(req, baseKey, 'eliminar-usuario').subscribe(

                (res) => {

                    if (res.estado == "Success") {

                        this.consultarListaUsuarios();

                        this.popupUsuarioNombres = '';
                        this.popupUsuarioApellidos = '';
                        this.popupUsuarioCorreo = '';
                        this.popupUsuarioPerfil = '';
                        this.popupUsuarioPrograma = '';

                        Swal.fire({

                            icon: 'success',
                            title: '¡Usuario Eliminado!',
                            text: 'El usuario a sido eliminado exitosamente',
                            allowOutsideClick: false,
                            customClass: {
                                popup: 'swal',
                                icon: 'swal-icon',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button',
                                cancelButton: 'swal-cancel-button'
                            }

                        })

                    } else {

                        Swal.fire({

                            icon: 'warning',
                            title: '¡Usuario No Encontrado!',
                            text: 'El usuario ingresado no existe',
                            allowOutsideClick: false,
                            customClass: {
                                popup: 'swal',
                                icon: 'swal-icon',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button',
                                cancelButton: 'swal-cancel-button'
                            }

                        })

                    }

                }

            )

        }

    }

    consultarConfiguracionSemestre() {

        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';

        this._http.get(baseKey, 'consultar-configuracion-semestre').subscribe(

            (res) => {

                console.log(res.lista)
                this.listaSemestre = [...res.lista];
                console.log(this.listaSemestre)

            }

        )

    }

    actualizarConfiguracionSemestre() {

        if (!this.popupSemestreSemestre || !this.popupSemestreCodSemestre || !this.popupSemestreFInicio || !this.popupSemestreFCierre) {

            Swal.fire({
                icon: 'warning',
                title: '¡Campos Vacíos!',
                text: 'Por favor, complete todos los campos requeridos.',
                allowOutsideClick: false,
                customClass: {
                    popup: 'swal',
                    icon: 'swal-icon',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    cancelButton: 'swal-cancel-button'
                }
            });

            return;

        } else {

            
            let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';


            let req = {
                grado: this.popupSemestreGrado,
                codigoGrado: this.popupSemestreCodGrado,
                semestre: this.popupSemestreSemestre,
                codigoSemestre: this.popupSemestreCodSemestre,
                fechaInicio: this.normalizarFecha(this.popupSemestreFInicio),
                fechaCierre: this.normalizarFecha(this.popupSemestreFCierre),
                usuarioModificacion: "Usuario Modificacion",
            }


            this._http.post(req, baseKey, 'actualizar-configuracion-semestre').subscribe(

                (res) => {

                    if (res.estado == "Success") {

                        this.consultarConfiguracionSemestre();

                        Swal.fire({

                            icon: 'success',
                            title: '¡Semestre Actualizado!',
                            text: 'El semestre ha sido actualizado correctamente',
                            allowOutsideClick: false,
                            customClass: {
                                popup: 'swal',
                                icon: 'swal-icon',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button',
                                cancelButton: 'swal-cancel-button'
                            }

                        });

                    } else {

                        Swal.fire({

                            icon: 'error',
                            title: '¡Error al Actualizar!',
                            text: 'Ocurrió un error al actualizar el semestre',
                            allowOutsideClick: false,
                            customClass: {
                                popup: 'swal',
                                icon: 'swal-icon',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button',
                                cancelButton: 'swal-cancel-button'
                            }

                        });

                    }
                        
                }

            )

        }

    }


    //#endregion


    //#region       FILTROS


    filtrarUsuarios() {

        const busqueda = (this.popupUsuarioBusqueda ?? '').toLowerCase();

        this.usuariosFiltrados = this.listaUsuarios.filter(item =>
            (item.nombres ?? '').toLowerCase().includes(busqueda) ||
            (item.apellidos ?? '').toLowerCase().includes(busqueda) ||
            (item.correo ?? '').toLowerCase().includes(busqueda) ||
            (item.perfil ?? '').toLowerCase().includes(busqueda)
        );

    }


    //#endregion


    //#region       VENTANAS


    popupActivo: 'usuarios' | 'semestre' | null = null;


    abrirPopup(tipo: 'usuarios' | 'semestre') {

        if (tipo === 'usuarios') {
            this.consultarListaUsuarios();
        }

        if (tipo === 'semestre') {
            // this.consultarConfiguracionSemestre(); // aquí llamas lo que necesites
        }

        this.popupActivo = tipo;

    }

    cerrarPopup() {

        this.popupActivo = null;

        this.popupUsuarioNombres = '';
        this.popupUsuarioApellidos = '';
        this.popupUsuarioCorreo = '';
        this.popupUsuarioPerfil = '';
        this.popupUsuarioPrograma = '';
        this.popupUsuarioBusqueda = '';

        this.popupSemestreGrado = '';
        this.popupSemestreCodGrado = '';
        this.popupSemestreSemestre = '';
        this.popupSemestreCodSemestre = '';
        this.popupSemestreFInicio = '';
        this.popupSemestreFCierre = '';

    }


    // Opcional: cerrar con tecla ESC
    @HostListener('document:keydown.escape', ['$event'])
    handleEscape(event: KeyboardEvent) {
        this.cerrarPopup();
    }


    copiarUsuarioDatos(item: any) {
        this.popupUsuarioNombres = item.nombres;
        this.popupUsuarioApellidos = item.apellidos;
        this.popupUsuarioCorreo = item.correo;
        this.popupUsuarioPerfil = item.perfil;
        this.popupUsuarioPrograma = item.programa;
    }

    copiarSemestreDatos(item: any) {
        this.popupSemestreGrado = item.grado;
        this.popupSemestreCodGrado = item.codigoGrado;
        this.popupSemestreSemestre = item.semestre;
        this.popupSemestreCodSemestre = item.codigoSemestre;
        this.popupSemestreFInicio = item.fechaInicio;
        this.popupSemestreFCierre = item.fechaCierre;
    }

    normalizarFecha(fecha: string): string {

        if (!fecha) return '';
        const d = new Date(fecha);

        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());

        d.setDate(d.getDate() + 1);

        return d.toISOString().split('T')[0];

    }


    //#endregion


}