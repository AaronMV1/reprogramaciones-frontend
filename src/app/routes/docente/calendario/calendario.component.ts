

import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import Swal from 'sweetalert2';
import { HttpService } from '../../../core/services/http.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
    selector: 'app-calendario',
    standalone: false,
    templateUrl: './calendario.component.html',
    styleUrl: './calendario.component.css'
})


export class CalendarioComponent implements OnInit {


    sesionListaPerfil: any[] = [];


    //  VARIABLES TABLA


    tablaGrado: string = '';


    //  VARIABLES DEL CALENDARIO


    events: any[] = [];
    primerDia: string = '';
    ultimoDia: string = '';


    //  LISTAS


    listaConfiguracionAplicacion: any[] = [];
    listaTablaHoraria: any[] = [];
    listaAmbientesDisponibles: any[] = [];
    listaHorarioDocente: any[] = [];
    listaCursos: any[] = [];
    listaValoresComponentes: any[] = [];
    listaValoresAmbientes: any[] = [];
    listaCorreoCopia: any[] = [];
    listaSemestre: any[] = [];
    listaSemestreSeleccionado: any[] = [];


    //  VARIABLES DE CONFIGURACION


    limiteClase: any = '';
    plazoMaximo: any = '';
    checkboxDocente: boolean = false;
    checkboxAlumno: boolean = false;
    checkboxDOA: boolean = false;
    checkboxCoordinadorPrograma: boolean = false;
    checkboxCoordinadorAmbiente: boolean = false;


    //  VARIABLES DE CLASE


    popupFormularioCursoID: string = '';
    popupFormularioNumeroClase: string = '';
    popupFormularioNumeroCampusMTG: string = '';
    popupFormularioCodigoSeccion: string = '';
    popupFormularioComponente: string = '';
    popupFormularioComponenteDesc: string = '';
    popupFormularioAmbienteID: string = '';
    popupFormularioTipoAmb: string = '';
    popupFormularioTipoAmbiente: string = '';
    popupFormularioUbicacion: string = '';
    popupFormularioModelo: string = '';
    popupFormularioPrograma: string = '';
    popupFormularioAsignatura: string = '';
    popupFormularioCantidadAlumnos: string = '';
    popupFormularioDocenteNombre: string = '';
    popupFormularioDocenteApPtrn: string = '';
    popupFormularioDocenteApMtrn: string = '';
    popupFormularioFecha: string = '';
    popupFormularioHoraI: string = '';
    popupFormularioHoraF: string = '';


    popupFormularioNuevaFecha: string = '';
    popupFormularioNuevaHoraI: string = '';
    popupFormularioNuevaHoraF: string = '';
    popupFormularioNuevoAmbienteID: string = '';
    popupFormularioNuevoMotivo: string = '';


    constructor(
        public _http: HttpService,
        private _router: Router,
        private messageService: MessageService
    ) {
        console.log('Constructor ejecutado');
    }


    ngOnInit(): void {

        const perfilGuardado = sessionStorage.getItem('perfil');
        this.sesionListaPerfil = perfilGuardado ? JSON.parse(perfilGuardado) : [];

        console.log("Perfil\n\n\n", this.sesionListaPerfil);

        this.consultarConfiguracionHorario();
        this.consultarValoresComponentes();
        this.consultarValoresAmbientes();
        this.consultarConfiguracionSemestre();

    }


    //#region       FUNCIONES DEL CALENDARIO        


    fechaCalendario: string = '2025-03-08';     //  PRUEBAS
    // fechaCalendario: any = new Date();       //  PRODUCCIÓN


    calendarOptions: CalendarOptions = {


        //  Configuración básica


        initialView: 'timeGridWeek',
        initialDate: this.fechaCalendario,
        editable: true,
        themeSystem: 'standard',
        locale: 'es',
        locales: [esLocale],


        //  Configuración de tiempo


        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false           // false → formato 24h, true → formato 12h
        },
        slotDuration: '01:00:00',   // intervalo de 30 minutos entre líneas
        slotMinTime: '07:00:00',    // desde qué hora empieza a renderizar slots
        slotMaxTime: '24:00:00',    // hasta qué hora mostrar
        scrollTime: '07:00:00',
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false           // importante para usar formato 24 horas
        },

        eventContent: function (arg: any) {

            let title = arg.event.title;
            let programa = arg.event.extendedProps.programa;
            let horaI = arg.event.extendedProps.horaI;
            let horaF = arg.event.extendedProps.horaF;

            return {

                html: `
                    <div style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        <p style="font-weight: 700; font-size: 1.5rem; margin-bottom: .3rem">${title}</p>
                        <p style="font-size: 1.2rem; font-style: italic;">${programa}</p>
                        <p style="font-size: 1.2rem; margin-top: .2rem;">${horaI} - ${horaF}</p>
                    </div>
                `

            };

        },


        //  Manejo de eventos del usuario


        // dateClick: (arg) => this.handleDateClick(arg),
        // eventDrop: (info) => this.handleEventDrop(info),
        // eventDrop: (info) => this.handleEventDrop2(info),
        eventClick: (info) => this.handleEventClick(info),
        datesSet: this.datesSet.bind(this),



        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],



        //  Datos cargados en el calendario


        events: [],



        //  Barra de navegación y botones


        headerToolbar: {
            left: 'botonRegresar',
            center: 'title',
            // right: 'today prev next botonActualizar'
            right: 'today prev next'
            // right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },

        customButtons: {

            botonRegresar: {
                text: 'Regresar',
                click: () => {
                    this._router.navigate(['/u/docente/inicio']);
                }

            },

            botonActualizar: {
                text: '↺',
                click: () => {

                    this.consultarHorarioDocente();

                }

            }

        },

        buttonIcons: {
            prev: '1',
            next: '',
        },

        buttonText: {
            // today: 'Hoy',
            // month: 'Mes',
            // week: 'Semana',
            // day: 'Día',
            prev: '<',
            next: '>'
        }


    };


    /*
    handleDateClick(arg: any) {

        // alert('date click! ' + arg.dateStr)
        // console.log(arg)

        this.consultarConfiguracionHorario();
        this.mostrarTablaHorarios(1);

    }
    handleEventDrop(info: any) {


        const event = info.event;

        // Puedes mostrar un mensaje de confirmación si lo deseas
        const confirmacion = confirm(`¿Deseas mover el evento "${event.title}" a la nueva fecha?`);

        if (!confirmacion) {
            info.revert(); // Revierte el cambio si se cancela
            return;
        }

        // Aquí puedes actualizar el evento en tu fuente de datos o servidor si es necesario
        console.log(`Evento movido: ${event.title}`);
        console.log(`Nueva fecha de inicio: ${event.start}`);
        console.log(`Nueva fecha de fin: ${event.end}`);

        Swal.fire({
            title: event.title,
            html: `
            <strong>Inicio:</strong> ${event.start?.toLocaleString()}<br/>
            <strong>Fin:</strong> ${event.end?.toLocaleString() || 'No especificado'}<br/>
            <strong>ID:</strong> ${event.id}
            `,
            icon: 'info',
            confirmButtonText: 'Cerrar'
        });

    }
    handleEventDrop2(info: any) {

        const originalStart = info.oldEvent.start;
        const newStart = info.event.start;
        const diasPermitidos = 7

        const diferenciaDias = Math.abs(
            Math.floor((newStart.getTime() - originalStart.getTime()) / (1000 * 60 * 60 * 24))
        );

        if (diferenciaDias > diasPermitidos) {

            info.revert();

            Swal.fire({
                icon: 'error',
                title: 'Movimiento no permitido',
                text: 'Solo puedes mover el evento dentro de un rango de ' + diasPermitidos + ' días desde la fecha original.',
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

            // info.revert();
            this.mostrarFormulario(1, info);
            // alert("Evento Actualizado!")
            // console.log('Movimiento válido dentro de 7 días');

        }

    }
    */


    handleEventClick(info: any) {


        const evento = info.event;

        if (evento.extendedProps.modelo[0] === 'M') {

            console.log("Evento:\n\n", evento)

            this.consultarConfiguracionAplicacion()

            this.listaAmbientesDisponibles = [];

            // Obtener Tipo Ambiente
            const ambiente = this.listaValoresAmbientes.filter((item: any) => item.VALOR_CAMPO === evento.extendedProps.tipoAmbiente);
            const tipo_ambiente = ambiente[0].DESCR_CAMPO;

            this.popupFormularioCursoID = evento.extendedProps.cursoID;
            this.popupFormularioNumeroClase = evento.extendedProps.numeroClase;
            this.popupFormularioNumeroCampusMTG = evento.extendedProps.numeroCampusMTG;
            this.popupFormularioCodigoSeccion = evento.extendedProps.codigoSeccion;
            this.popupFormularioComponente = evento.extendedProps.componente;
            this.popupFormularioComponenteDesc = evento.extendedProps.componenteDesc;
            this.popupFormularioAmbienteID = evento.extendedProps.ambienteID;
            this.popupFormularioTipoAmb = tipo_ambiente;
            this.popupFormularioTipoAmbiente = evento.extendedProps.tipoAmbiente;
            this.popupFormularioUbicacion = evento.extendedProps.ubicacion;
            this.popupFormularioModelo = evento.extendedProps.modelo;
            this.popupFormularioPrograma = evento.extendedProps.programa;
            this.popupFormularioAsignatura = evento.extendedProps.asignatura;
            this.popupFormularioCantidadAlumnos = evento.extendedProps.cantidadAlumnos;
            this.popupFormularioDocenteNombre = evento.extendedProps.docenteNombre;
            this.popupFormularioDocenteApPtrn = evento.extendedProps.docenteApPtrn;
            this.popupFormularioDocenteApMtrn = evento.extendedProps.docenteApMtrn;
            this.popupFormularioFecha = evento.extendedProps.fecha;
            this.popupFormularioHoraI = evento.extendedProps.horaI;
            this.popupFormularioHoraF = evento.extendedProps.horaF;

            console.log("Curso ID:\t\t", this.popupFormularioCursoID);
            console.log("Numero Clase:\t\t", this.popupFormularioNumeroClase);
            console.log("Numero Campus MTG:\t\t", this.popupFormularioNumeroCampusMTG);
            console.log("Codigo Seccion:\t\t", this.popupFormularioCodigoSeccion);
            console.log("Componente:\t\t", this.popupFormularioComponente);
            console.log("Componente Desc:\t", this.popupFormularioComponenteDesc);
            console.log("Ambiente ID:\t\t", this.popupFormularioAmbienteID)
            console.log("Ambiente Tipo:\t\t", this.popupFormularioTipoAmbiente);
            console.log("Ambiente Tipo Desc:\t", this.popupFormularioTipoAmb);
            console.log("Ubicacion:\t\t", this.popupFormularioUbicacion);
            console.log("Modelo:\t\t\t", this.popupFormularioModelo);
            console.log("Programa:\t\t\t", this.popupFormularioPrograma);
            console.log("Asignatura:\t\t", this.popupFormularioAsignatura);
            console.log("Cantidad Alumnos:\t", this.popupFormularioCantidadAlumnos);
            console.log("Docente Nombre:\t\t", this.popupFormularioDocenteNombre);
            console.log("Docente Ap.Pat:\t\t", this.popupFormularioDocenteApPtrn);
            console.log("Docente Ap.Mat:\t\t", this.popupFormularioDocenteApMtrn);
            console.log("Fecha:\t\t\t", this.popupFormularioFecha);
            console.log("Hora Inicio:\t\t", this.popupFormularioHoraI);
            console.log("Hora Fin:\t\t", this.popupFormularioHoraF);

            this.mostrarFormulario(1, evento);

            this.popupFormularioNuevaFecha = "";
            this.popupFormularioNuevaHoraI = "";
            this.popupFormularioNuevaHoraF = "";
            this.popupFormularioNuevoAmbienteID = "";
            this.popupFormularioNuevoMotivo = "";

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Reprogramación No Disponible',
                text: 'La clase no está disponible para reprogramar o ya fue reprogramada anteriormente.',
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


    datesSet(info: any) {

        const currentMonthDate = info.view.currentStart;

        const year = currentMonthDate.getFullYear();
        const month = currentMonthDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const format = (date: Date) =>

            `${date.getFullYear().toString()}` +
            `-` +
            `${(date.getMonth() + 1).toString().padStart(2, '0')}` +
            `-` +
            `${date.getDate().toString().padStart(2, '0')}`;

        // console.log('Primer día del mes:', format(firstDay));
        // console.log('Último día del mes:', format(lastDay));

        this.primerDia = format(firstDay);
        this.ultimoDia = format(lastDay);

    }


    //#endregion                                 


    //#region       FUNCIONES                       


    popup: boolean = false;
    popupFormulario: boolean = false;
    popupTablaHorarios: boolean = false;


    mostrarFormulario(val: any, val2: any) {

        if (val == 1) {

            this.popup = true;
            this.popupFormulario = true;

            this.popupFormularioAsignatura = val2.title;

            // this.popupFormularioNuevaHoraF = val2.start.toLocaleDateString('es-PE'); 
            // const dia = val2.start.getDate().toString().padStart(2, '0');
            // const mes = (val2.start.getMonth() + 1).toString().padStart(2, '0'); // los meses empiezan en 0
            // const anio = val2.start.getFullYear();
            // this.popupFormularioNuevaHoraI = `${dia}-${mes}-${anio}`;

        } else if (val == 0) {

            this.popup = false;
            this.popupFormulario = false;

        }

    }

    mostrarTablaHorarios(val: any) {

        if (val == 1) {

            this.popup = true;
            this.popupTablaHorarios = true;

        } else if (val == 0) {

            this.popup = false;
            this.popupTablaHorarios = false;

        }

    }

    buscarAmbientesDisponibles() {

        if (this.popupFormularioNuevaFecha.length == 0 || this.popupFormularioNuevaHoraI.length == 0 || this.popupFormularioNuevaHoraF.length == 0) {

            Swal.fire({
                icon: 'warning',
                title: 'Datos incompletos',
                text: 'Agregue fecha y rango de hora en su búsqueda.',
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

            if (this.popupFormularioNuevaHoraI > this.popupFormularioNuevaHoraF) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Error en el rango de horas',
                    text: 'La hora inicio no puede ser mayor a hora fin.',
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

                this.consultarAmbientesDisponibles();

            }

        }

    }


    //#endregion


    //#region       SERVICIOS                       


    loading: boolean = false;


    consultarConfiguracionAplicacion() {

        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';

        this._http.get(baseKey, 'consultar-configuracion').subscribe(

            (res) => {

                this.listaConfiguracionAplicacion = res.lista;
                this.limiteClase = res.lista[0].limiteReprogramaciones;
                this.plazoMaximo = res.lista[0].plazoMaximo;
                this.checkboxDocente = res.lista[0].correoDocente;
                this.checkboxAlumno = res.lista[0].correoAlumno;
                this.checkboxDOA = res.lista[0].correoDOA;
                this.checkboxCoordinadorPrograma = res.lista[0].correoCoordinadorPrograma;
                this.checkboxCoordinadorAmbiente = res.lista[0].correoCoordinadorAmbiente;

                this.servicioCorreo();

                console.log("Configuración Aplicación\n\n");

            }

        );

    }

    consultarConfiguracionHorario() {


        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_3';


        const headers = {
            'country': 'PE',
            'provider': 'integracion',
            'apiKey': 'Z2ZKVS8vMk15SVg5M0Fqdlc5MFY1R2s2alJBbE01Sk9PZWhaV1ovbkhXU2VIRmQ4T0w2UU5wUHZKeWZ5bkg0dA=='
        };


        this._http.getWithHeaders(baseKey, `https://backdev-campus.upsjb.edu.pe/apisIntegracionesReprogramacionClases/api/v1/integracion/reprogramacion-clases/tabla-horaria/UPSJB/PREG`, headers).subscribe(

            (res: any) => {

                const tabla_horaria = res?.result?.sjB_OBT_TABLA_HORARIA_RESP;

                if (Array.isArray(tabla_horaria?.sjB_OBT_TABLA_HORARIA_RES)) {

                    this.listaTablaHoraria = tabla_horaria.sjB_OBT_TABLA_HORARIA_RES.filter((item: any) => item.tipO_HORARIO === 'REGULAR');

                } else {

                    this.listaTablaHoraria = [];

                }

                console.log("Configuración Horario\n\n", this.listaTablaHoraria);

            }

        );

    }

    consultarHorarioDocente() {


        if (!this.tablaGrado) {


            this.messageService.add({
                severity: 'warn',
                detail: 'Seleccione un grado'
            });


        } else {


            this.loading = true


            let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_3';


            const [grado, semestre] = this.tablaGrado.split('|');


            this.listaSemestreSeleccionado = this.listaSemestre.filter((item: any) => (item.codigoGrado === grado));
            // console.log(this.listaSemestreSeleccionado);

            this.calcularRangoFecha();


            let req = {
                "institucion": "UPSJB",
                "gradoAcademico": grado,
                "semestre": semestre,
                "codigoAlumno": "1000151224",
                // "fechaInicio": this.primerDia,
                // "fechaFinal": this.ultimoDia
                "fechaInicio": this.fechaCalendario,
                "fechaFinal": "2025-06-30"
            }


            const headers = {
                'country': 'PE',
                'provider': 'integracion',
                'apiKey': 'Z2ZKVS8vMk15SVg5M0Fqdlc5MFY1R2s2alJBbE01Sk9PZWhaV1ovbkhXU2VIRmQ4T0w2UU5wUHZKeWZ5bkg0dA=='
            };


            function convertirHoraDecimal(horaStr: string): string {
                const [hora, minuto] = horaStr.split('.');
                const horaFormateada = hora.padStart(2, '0');
                const minutoFormateado = minuto?.padEnd(2, '0') || '00';
                return `${horaFormateada}:${minutoFormateado}:00`;
            }


            this._http.postWithHeaders(req, baseKey, 'api/v1/integracion/reprogramacion-clases/horario-docente', headers).subscribe(

                (res: any) => {

                    const horario_docente = res?.result?.sjB_OBT_HORARIO_DOCENTE_RESP;

                    if (Array.isArray(horario_docente?.sjB_OBT_HORARIO_DOCENTE_RES)) {

                        this.listaHorarioDocente = horario_docente.sjB_OBT_HORARIO_DOCENTE_RES;

                        if (this.listaHorarioDocente.length > 0) {

                            this.messageService.add({
                                severity: 'success',
                                detail: 'El horario ha sido actualizado'
                            });

                            const eventosFormateados = this.listaHorarioDocente.map((h: any) => {

                                const horaInicio = convertirHoraDecimal(h.horA_INICIO);
                                const horaFin = convertirHoraDecimal(h.horA_FIN);

                                return {

                                    title: h.descr || 'Clase',
                                    start: `${h.meetinG_DT}T${horaInicio}`,
                                    end: `${h.meetinG_DT}T${horaFin}`,
                                    allDay: false,
                                    color: h.stnD_MTG_PAT[0] === 'M' ? '#007bff' : '#36f162ff',

                                    extendedProps: {

                                        cursoID: h.crsE_ID,
                                        numeroClase: h.clasS_NBR,
                                        numeroCampusMTG: h.campuS_MTG_NBR,
                                        codigoSeccion: h.sessioN_CODE,
                                        componente: h.ssR_COMPONENT,
                                        componenteDesc: h.descR_COMPONENTE,
                                        ambienteID: h.facilitY_ID,
                                        tipoAmbiente: h.facilitY_TYPE,
                                        ubicacion: h.location,

                                        modelo: h.stnD_MTG_PAT,
                                        programa: h.sjB_DESCR_ESCUELA,

                                        asignatura: h.descr,
                                        cantidadAlumnos: h.enrL_CAP,
                                        docenteNombre: h.firsT_NAME,
                                        docenteApPtrn: h.lasT_NAME,
                                        docenteApMtrn: h.seconD_LAST_NAME,

                                        fecha: h.meetinG_DT,
                                        horaI: h.horA_INICIO,
                                        horaF: h.horA_FIN,

                                    }

                                };

                            });

                            this.calendarOptions.events = eventosFormateados;

                        } else {

                            this.calendarOptions.events = [];
                        }

                    } else {

                        this.messageService.add({
                            severity: 'error',
                            detail: 'No hay horario que mostrar'
                        });

                        this.listaHorarioDocente = [];
                        this.calendarOptions.events = [];

                    }

                    console.log("Horario Docente\n\n", this.listaHorarioDocente);

                    this.loading = false

                }

            );

        }

    }

    consultarAmbientesDisponibles() {

        
        this.loading = true;


        this.consultarConfiguracionAplicacion();


        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_3';


        let req = {
            "FechaInicio": this.popupFormularioNuevaFecha,                         //  "2025-03-06"
            "FechaFinal": this.popupFormularioNuevaFecha,                          //  "2025-03-06"
            "HoraInicioClase": this.popupFormularioHoraI,           //  "18.35"
            "HoraFinClase": this.popupFormularioHoraF,              //  "20.05"
            "TipoInstalacion": this.popupFormularioTipoAmbiente,    //  "LCRT"
            "CodigoUbicacion": this.popupFormularioUbicacion,       //  "L0034"
            "Domingo": "",
            "Lunes": "",
            "Martes": "",
            "Miercoles": "",
            "Jueves": "1",
            "Viernes": "",
            "Sabado": ""
        }


        const headers = {
            'country': 'PE',
            'provider': 'integracion',
            'apiKey': 'Z2ZKVS8vMk15SVg5M0Fqdlc5MFY1R2s2alJBbE01Sk9PZWhaV1ovbkhXU2VIRmQ4T0w2UU5wUHZKeWZ5bkg0dA=='
        };


        this._http.postWithHeaders(req, baseKey, 'api/v1/integracion/reprogramacion-clases/ambientes-disponibles', headers).subscribe(

            (res: any) => {

                const ambientes_disponibles = res?.result?.sjB_OBT_DISP_AMBIENTE_RESP;

                if (Array.isArray(ambientes_disponibles?.sjB_OBT_DISP_AMBIENTE_RES)) {

                    this.listaAmbientesDisponibles = ambientes_disponibles.sjB_OBT_DISP_AMBIENTE_RES;

                    Swal.fire({
                        icon: 'success',
                        title: '¡Ambientes Encontrados!',
                        text: `Número de resultados: ${this.listaAmbientesDisponibles.length} ambientes`,
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

                    this.listaAmbientesDisponibles = [];

                }

                console.log("Ambientes Disponibles\n\n", this.listaAmbientesDisponibles);

                this.loading = false;

            }

        );

    }


    consultarValoresComponentes() {

        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_3';

        this._http.get(baseKey, '/api/PSIGW/RESTListeningConnector/PSFT_CS/SJB_OBT_VALORES_XLAT.v1/VALORES/SSR_COMPONENT').subscribe(

            (res) => {

                const valores_componentes = res?.SJB_OBT_VALOR_XLAT_RESP;

                if (Array.isArray(valores_componentes?.SJB_OBT_VALOR_XLAT_RES)) {

                    this.listaValoresComponentes = valores_componentes.SJB_OBT_VALOR_XLAT_RES.filter((item: any) => item.ESTADO === 'A');

                } else {

                    this.listaValoresComponentes = [];

                }

                console.log("Componentes Valores\n\n", this.listaValoresComponentes);

            }

        );

    }

    consultarValoresAmbientes() {

        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_3';

        this._http.get(baseKey, '/api/PSIGW/RESTListeningConnector/PSFT_CS/SJB_OBT_VALORES_XLAT.v1/VALORES/FACILITY_TYPE').subscribe(

            (res) => {

                const valores_ambientes = res?.SJB_OBT_VALOR_XLAT_RESP;

                if (Array.isArray(valores_ambientes?.SJB_OBT_VALOR_XLAT_RES)) {

                    this.listaValoresAmbientes = valores_ambientes.SJB_OBT_VALOR_XLAT_RES.filter((item: any) => item.ESTADO === 'A');

                } else {

                    this.listaValoresAmbientes = [];

                }

                console.log("Ambientes Valores\n\n", this.listaValoresAmbientes);

            }

        );

    }


    enviarSolicitud() {


        if (this.popupFormularioNuevoAmbienteID.length == 0 || this.popupFormularioNuevoMotivo.length == 0) {

            Swal.fire({
                icon: 'warning',
                title: 'Falta seleccionar ambiente y motivo',
                text: 'Seleccione un ambiente disponible y motivo de reprogramación para enviar su solicitud.',
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

        }


        let plantilla = `


            <h2>⚠️ Aviso Importante:</h2>
            <p></p>Este correo corresponde a una prueba de notificación automática. Si lo ha recibido por error, por favor haga caso omiso del presente mensaje.</p>


            <div style="height: auto; width: 30rem; background-color: white; margin: 40px auto; display: flex; flex-direction: column; position: relative; box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1);">

                <div style="background-color: #FF0A41; width: 100%; height: 12rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">

                    <img src="https://backdev-campus.upsjb.edu.pe/reprogramacion-clases/assets/img/correo/correo-banner.png" alt="" style="height: 100%; width: 100%; border: none;">
                    <!-- <h2 style="font-family: calibri; color: white; font-size: 1.5rem;">Reprogramación de Clases</h2> -->
                    
                </div>

                <div style="flex: 1; padding: 1rem 2rem; font-size: .8rem; font-family: calibri;">

                    <h4>Estimado(a) ` + this.sesionListaPerfil[0].nombres + ` ` + this.sesionListaPerfil[0].apellidos + `,</h4>
                    
                    <p style="text-align: justify;">Le informamos que se ha realizado una reprogramación en una de sus asignaturas del presente semestre. A continuación, se detallan los cambios efectuados:</p>

                    <h4 style="margin-bottom: 0rem;">Información del Curso</h4>
                    <ul>
                        <li><span style="display:inline-block; width:5rem;">Programa:</span> <span style="font-style: italic">` + this.formatearTexto(this.popupFormularioPrograma) + `</span></li>
                        <li><span style="display:inline-block; width:5rem;">Asignatura:</span> <span style="font-style: italic">` + this.formatearTexto(this.popupFormularioAsignatura) + `</span></li>
                        <li><span style="display:inline-block; width:5rem;">Componente:</span> <span style="font-style: italic">` + this.formatearTexto(this.popupFormularioComponenteDesc) + `</span></li>
                        <li><span style="display:inline-block; width:5rem;">Local:</span> <span style="font-style: italic">Chorrillos</span></li>
                    </ul>

                    <h4 style="margin-bottom: 0rem;">Programación Anterior</h4>
                    <ul>
                        <li><span style="display:inline-block; width:5rem;">Ambiente:</span> <span style="font-style: italic">` + this.popupFormularioAmbienteID + `</span></li>
                        <li><span style="display:inline-block; width:5rem;">Fecha:</span> <span style="font-style: italic">${this.formatearFecha(this.popupFormularioFecha)}</span></li>
                        <li><span style="display:inline-block; width:5rem;">Hora:</span> <span style="font-style: italic">${this.formatearHora(this.popupFormularioHoraI)} - ${this.formatearHora(this.popupFormularioHoraF)}</span></li>
                    </ul>

                    <h4 style="margin-bottom: 0rem;">Programación Actualizada</h4>
                    <ul>
                        <li><span style="display:inline-block; width:5rem;">Ambiente:</span> <span style="font-style: italic">` + this.popupFormularioNuevoAmbienteID + `</span></li>
                        <li><span style="display:inline-block; width:5rem;">Fecha:</span> <span style="font-style: italic">${this.formatearFecha(this.popupFormularioNuevaFecha)}</span></li>
                        <li><span style="display:inline-block; width:5rem;">Hora:</span> <span style="font-style: italic">${this.formatearHora(this.popupFormularioNuevaHoraI)} - ${this.formatearHora(this.popupFormularioNuevaHoraF)}</span></li>
                    </ul>

                    <p>Esta reprogramación responde a necesidades académicas y logísticas con el fin de garantizar el desarrollo óptimo de la clase.</p>

                    <p>Atentamente,</p>
                    <p style="font-weight: 700;">Universidad Privada San Juan Bautista</p>

                </div>

                <div style="position: absolute; bottom: 0; left: 0; background-color: #FF0A41; width: 100%; height: 4rem;">

                    <img src="https://mailing.upsjb.edu.pe/hs-fs/hubfs/FOOTER-Apr-30-2024-08-34-22-0239-PM.png?width=1200&upscale=true&name=FOOTER-Apr-30-2024-08-34-22-0239-PM.png" alt="" style="height: 100%; width: 100%;">

                </div>

            </div>
            
        `;


        this.loading = true;


        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';


        let req = {
            destinatario: this.sesionListaPerfil[0].correo,
            correoCopia: this.listaCorreoCopia.join(','),
            asunto: 'Reprogramación de Clase - UPSJB',
            nombres: this.sesionListaPerfil[0].nombres + ' ' + this.sesionListaPerfil[0].apellidos,
            cuerpoHTML: plantilla
        }


        this._http.post(req, baseKey, 'admin-enviar-email').subscribe(

            (res: any) => {

                this.loading = false;

                Swal.fire({
                    icon: 'success',
                    title: '¡Solicitud Enviada!',
                    text: 'Su solicitud de reprogramación ha sido enviada con éxito.',
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

                this.listaAmbientesDisponibles = [];
                this.popupFormularioNuevoMotivo = '';

                this.mostrarFormulario(0, null)

            }

        )

    }

    servicioCorreo() {

        this.listaCorreoCopia = [];

        // console.log(" Correo Docente", this.listaConfiguracionAplicacion[0].correoDocente);
        // console.log(" Correo Alumno", this.listaConfiguracionAplicacion[0].correoAlumno);
        // console.log(" Correo DOA", this.listaConfiguracionAplicacion[0].correoDOA);
        // console.log(" Correo Coord. Programa", this.listaConfiguracionAplicacion[0].correoCoordinadorPrograma);
        // console.log(" Correo Coord. Ambiente", this.listaConfiguracionAplicacion[0].correoCoordinadorAmbiente);

        if (this.checkboxDOA) {
            this.consultarCorreoUsuariosDOA()
        }

        if (this.checkboxAlumno) {
            this.consultarCorreoAlumnosPrueba();
            // this.consultarCorreoAlumnos();
        }

        // console.log("Correos Finales:\n\n", this.listaCorreoCopia);

    }

    consultarCorreoAlumnos() {

        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_3';

        let institucion = 'UPSJB';
        let gradoAcademico = 'PREG';
        let semestre = 2251;
        let clase = this.popupFormularioNumeroClase;

        this._http.get(baseKey, '/api/PSIGW/RESTListeningConnector/PSFT_CS/SJB_INSCRITOS_CLASES.v1/InscritosClase/' + institucion + '/' + gradoAcademico + '/' + semestre + '/' + clase).subscribe(

            (res) => {

                let nuevosCorreos = res.SJB_OBT_INSXCLASE_RESP.SJB_OBT_INSXCLASE_RES
                    .filter((item: any) => item.EMAIL_INSTITUCIONAL && item.EMAIL_INSTITUCIONAL.trim() !== '')
                    .map((item: any) => item.EMAIL_INSTITUCIONAL.toLowerCase());

                this.listaCorreoCopia = [...this.listaCorreoCopia, ...nuevosCorreos];

                // console.log("Correos Alumnos\n\n", this.listaCorreoCopia);

            }

        );

    }

    consultarCorreoUsuariosDOA() {

        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';

        this._http.get(baseKey, 'consultar-lista-usuarios').subscribe(

            (res) => {

                let nuevosCorreos = res.lista.filter((item: any) => item.perfil === 'DOA');
                nuevosCorreos = nuevosCorreos.map((item: any) => item.correo.toLowerCase());

                this.listaCorreoCopia = [...this.listaCorreoCopia, ...nuevosCorreos];

                // console.log("Correos Usuarios DOA\n\n", this.listaCorreoCopia);

            }

        )

    }

    consultarConfiguracionSemestre() {

        let baseKey: keyof typeof environment.ENDPOINTS = 'API_SERVICIOS_LOCAL';

        this._http.get(baseKey, 'consultar-configuracion-semestre').subscribe(

            (res) => {

                this.listaSemestre = [...res.lista];

                console.log("Lista Semestre\n\n", this.listaSemestre);

            }

        )

    }


    //#endregion


    //#region       UTILIDADES                      


    formatearTexto(texto: string): string {
        if (!texto) return '';

        return texto
            .toLowerCase()
            .split(' ')
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
            .join(' ');
    }

    formatearFecha(fechaISO: string): string {
        if (!fechaISO) return '';
        const [year, month, day] = fechaISO.split('-');
        return `${day}/${month}/${year}`;
    }

    formatearHora(hora: string): string {
        if (!hora) return '';
        let [h, m] = hora.split('.');
        if (!m) m = '00';
        return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    }

    minDate!: string;
    maxDate!: string;

    
    calcularRangoFecha() {


        const semestre = this.listaSemestreSeleccionado[0];


        //  Antes

        const fechaBase = new Date(this.fechaCalendario); // ej. 15/02/2025
        fechaBase.setDate(fechaBase.getDate() + 1)

        const fechaInicio = new Date(semestre.fechaInicio);   // ej. 01/03/2025 

        
        const fechaMin = fechaBase > fechaInicio ? fechaBase : fechaInicio;

        //  Despues

        const fechaMax = new Date(semestre.fechaCierre);

        // 7 días antes
        
        // const fechaMin = new Date(fechaBase);
        // fechaMin.setDate(fechaBase.getDate() - 7);
        // fechaMin.setDate(fechaBase.getDate() - this.plazoMaximo);
        
        // 7 días después

        // const fechaMax = new Date(fechaBase);
        // fechaMax.setDate(fechaBase.getDate() + 7);
        // fechaMax.setDate(fechaBase.getDate() + this.plazoMaximo);
        

        // Convertimos a formato YYYY-MM-DD
        this.minDate = fechaMin.toISOString().split('T')[0];
        this.maxDate = fechaMax.toISOString().split('T')[0];

    }

    detectarCambioFechaHora(event: any) {

        const nuevaFecha = event.target.value; // string YYYY-MM-DD

        this.fechaCalendario = nuevaFecha;

        // ❌ Ya no recalculas rango, se mantiene con la fecha inicial

        // actualizar el calendario

        this.calendarOptions = {
            ...this.calendarOptions,
            initialDate: this.fechaCalendario
        };

        console.log("Nueva fecha seleccionada:", this.fechaCalendario);

        this.listaAmbientesDisponibles = [];
        this.popupFormularioNuevoAmbienteID = '';
        this.popupFormularioNuevoMotivo = '';

    }

    horaFinValida: string = '';

    detectarCambioHoraInicio(event: any) {

        const horaSeleccionada = event.target.value; // ej: "20.55"

        this.popupFormularioNuevaHoraI = horaSeleccionada;

        // Buscar la posición de la hora inicio en la lista

        const indexInicio = this.listaTablaHoraria.findIndex(h => h.horA_INICIO === this.popupFormularioNuevaHoraI);

        if (indexInicio !== -1) {

            const indexFin = indexInicio + 1;

            if (indexFin < this.listaTablaHoraria.length) {

                this.horaFinValida = this.listaTablaHoraria[indexFin].horA_FIN;
                this.popupFormularioNuevaHoraF = this.horaFinValida;

            } else {

                this.horaFinValida = '';
                this.popupFormularioNuevaHoraF = '';

            }

        }

        this.listaAmbientesDisponibles = [];
        this.popupFormularioNuevoAmbienteID = '';
        this.popupFormularioNuevoMotivo = '';

    }

    //#endregion


    //#region       FUNCIONES DE PRUEBA             


    consultarCorreoAlumnosPrueba() {

        let lista: string[] = [
            "CHRISTIAN.MORI@UPSJB.EDU.PE",
            "AARON-MV@OUTLOOK.COM",
            "AARONMORIVALDIVIA@GMAIL.COM",
            "HALION71332@GMAIL.COM"
        ];

        let nuevosCorreos = lista.map((correo) => correo.toLowerCase());

        this.listaCorreoCopia = [...this.listaCorreoCopia, ...nuevosCorreos];

        // console.log("Correos Prueba\n\n", this.listaCorreoCopia);

    }


    //#endregion


}