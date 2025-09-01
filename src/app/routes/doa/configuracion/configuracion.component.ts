

import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../core/services/http.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-configuracion',
    standalone: false,
    templateUrl: './configuracion.component.html',
    styleUrl: './configuracion.component.css'
})


export class ConfiguracionComponent implements OnInit {


    listaUsuarios: any[] = [];
    usuariosFiltrados: any[] = [];


    popupUsuarioNombres = '';
    popupUsuarioApellidos = '';
    popupUsuarioCorreo = '';
    popupUsuarioPerfil = '';
    popupUsuarioPrograma = '';
    popupUsuarioBusqueda = '';


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

        this.consultarListaUsuarios();
        this.consultarConfiguracion();

    }


    //#region       FUNCIONES


    redirigirInicio() {
        this._router.navigate(['/u/doa/inicio']);
    }

    consultarConfiguracion() {

        this._http.get('consultar-configuracion').subscribe(

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

        let req = {
            limiteReprogramaciones: this.limiteClase,
            plazoMaximo: this.plazoMaximo,
            correoDocente: this.checkboxDocente,
            correoAlumno: this.checkboxAlumno,
            correoDOA: this.checkboxDOA,
            correoCoordinadorPrograma: this.checkboxCoordinadorPrograma,
            correoCoordinadorAmbiente: this.checkboxCoordinadorAmbiente
        }

        this._http.post(req, 'actualizar-configuracion').subscribe(

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

        this._http.get('consultar-lista-usuarios').subscribe(

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

            let req = {
                nombres: this.popupUsuarioNombres,
                apellidos: this.popupUsuarioApellidos,
                correo: this.popupUsuarioCorreo,
                perfil: this.popupUsuarioPerfil,
                programa: this.popupUsuarioPrograma,
                usuarioResponsable: "12345"
            }

            this._http.post(req, 'registrar-usuario').subscribe(

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

            let req = {
                nombres: this.popupUsuarioNombres,
                apellidos: this.popupUsuarioApellidos,
                correo: this.popupUsuarioCorreo,
                perfil: this.popupUsuarioPerfil,
                programa: this.popupUsuarioPrograma,
            }

            this._http.post(req, 'actualizar-usuario').subscribe(

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

            let req = {
                correo: this.popupUsuarioCorreo
            }

            this._http.post(req, 'eliminar-usuario').subscribe(

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

    restablecerPredeterminados() {

        this.limiteClase = 2;
        this.plazoMaximo = 7;
        this.checkboxDocente = true;
        this.checkboxAlumno = true;
        this.checkboxDOA = false;
        this.checkboxCoordinadorPrograma = true;
        this.checkboxCoordinadorAmbiente = false;

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


    popupActivo: 'usuarios' | null = null;


    abrirPopup(tipo: 'usuarios') {
        this.popupActivo = tipo;
    }

    cerrarPopup() {
        this.popupActivo = null;
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


    //#endregion


}