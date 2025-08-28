

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


@Component({
    selector: 'app-calendario',
    standalone: false,
    templateUrl: './calendario.component.html',
    styleUrl: './calendario.component.css'
})


export class CalendarioComponent implements OnInit {


    events: any[] = [];


    listaTablaHoraria: any[] = [];
    listaAmbientesDispnibles: any[] = [];
    listaHorarioDocente: any[] = [];
    listaCursos: any[] = [];


    primerDia: string = '';
    ultimoDia: string = '';


    popupFormularioIDCurso: string = '';
    popupFormularioNoClase: string = '';
    popupFormularioCompnte: string = '';
    popupFormularioSesion: string = '';


    isLoading = true;


    listaTablaRegistro: any[] = [
        {
            clase: "Clase",
            componente: "Componente",
            tipoAmbiente: "Tipo de Ambiente",
            fecha: "24/09/1996",
            ambiente: "Ambiente",
            motivo: "Motivo"
        },
        {
            clase: "Clase",
            componente: "Componente",
            tipoAmbiente: "Tipo de Ambiente",
            fecha: "24/09/1996",
            ambiente: "Ambiente",
            motivo: "Motivo"
        },
        {
            clase: "Clase",
            componente: "Componente",
            tipoAmbiente: "Tipo de Ambiente",
            fecha: "24/09/1996",
            ambiente: "Ambiente",
            motivo: "Motivo"
        },
        {
            clase: "Clase",
            componente: "Componente",
            tipoAmbiente: "Tipo de Ambiente",
            fecha: "24/09/1996",
            ambiente: "Ambiente",
            motivo: "Motivo"
        },
    ];



    constructor(
        public _http: HttpService,
        private _router: Router,
        private messageService: MessageService
    ) {
        console.log('Constructor ejecutado');
    }


    ngOnInit(): void {

        // this.consultarHorarioPrueba();

        this.consultarHorarioDocente();
        this.consultarConfiguracionHorario();
        this.consultarAmbientesDisponibles();

    }


    //#region       FUNCIONES DEL CALENDARIO    


    calendarOptions: CalendarOptions = {


        initialView: 'timeGridWeek',


        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false           // false → formato 24h, true → formato 12h
        },
        slotDuration: '01:00:00',   // intervalo de 30 minutos entre líneas
        slotMinTime: '07:00:00',   // desde qué hora empieza a renderizar slots
        slotMaxTime: '24:00:00',   // hasta qué hora mostrar
        scrollTime: '07:00:00',


        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],


        editable: true,


        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 👈 importante para usar formato 24 horas
        },


        locale: 'es',
        locales: [esLocale],


        dateClick: (arg) => this.handleDateClick(arg),
        // eventDrop: (info) => this.handleEventDrop(info),
        eventDrop: (info) => this.handleEventDrop2(info),
        eventClick: (info) => this.handleEventClick(info),


        datesSet: this.datesSet.bind(this),


        events: [],


        headerToolbar: {
            left: 'botonRegresar',
            center: 'title',
            right: 'today prev next botonActualizar'
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

        themeSystem: 'standard',

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

    handleDateClick(arg: any) {

        /*
        alert('date click! ' + arg.dateStr)
        console.log(arg)
        */
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

    handleEventClick(info: any) {


        const evento = info.event;


        alert(
            `   Datos del evento:
                Título: ${evento.title}
                Inicio: ${evento.start?.toLocaleString('es-PE')}
                Fin: ${evento.end?.toLocaleString('es-PE') || 'No especificado'}
                Tipo: ${evento.extendedProps.tipoClase}
                Docente: ${evento.extendedProps.docente}
                Asignatura: ${evento.extendedProps.asignatura}
                Ambiente: ${evento.extendedProps.ambiente}  `
        );

        this.popupFormularioIDCurso = evento.extendedProps.docente;
        this.popupFormularioNoClase = evento.extendedProps.docente;
        this.popupFormularioCompnte = evento.extendedProps.docente;
        this.popupFormularioSesion = evento.extendedProps.docente;

        this.mostrarFormulario(1, evento);


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


    consultarHorarioPrueba() {

        const req = {
            docenteDNI: '12345678',
        };

        this._http.post(req, 'http://localhost:8080/consultar-curso',).subscribe((res: any) => {

            console.log(res);

            this.events = res.lista.map((evento: any) => {

                const indicadorColor = evento.tipoClase === 'HorasLectivas' ? '#007bff' : '#28a745';

                return {
                    title: evento.nombre,
                    start: evento.fechaHoraIni,
                    end: evento.fechaHoraFin,
                    id: evento.id,
                    color: indicadorColor
                };

            });

            this.calendarOptions.events = [...this.events];     // Agregar esto para actualizar el calendario

        });

    }

    consultarHorarioDocente() {


        let req = {
            "institucion": "UPSJB",
            "gradoAcademico": "PREG",
            "semestre": "2251",
            "codigoAlumno": "1000151224",
            "fechaInicio": this.primerDia,
            "fechaFinal": this.ultimoDia
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


        this._http.postWithHeaders(req, 'https://backdev-campus.upsjb.edu.pe/apisIntegracionesReprogramacionClases/api/v1/integracion/reprogramacion-clases/horario-docente', headers).subscribe(

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
                                color: h.TIPO_CLASE === 'HorasLectivas' ? '#007bff' : '#28a745',

                                extendedProps: {
                                    componente: h.ssR_COMPONENT,
                                    componenteDesc: h.descR_COMPONENTE,
                                    tipoAmbiente: h.facilitY_TYPE,
                                    asignatura: h.descr,
                                    docenteNombre: h.firsT_NAME,
                                    docenteApPtrn: h.lasT_NAME,
                                    docenteApMtrn: h.seconD_LAST_NAME,
                                    ambienteID: h.facilitY_ID,
                                    fecha: h.meetinG_DT,
                                    horaI: h.horA_INICIO,
                                    horaF: h.horA_FIN,
                                    ubicacion: h.location,
                                }

                            };

                        });

                        this.calendarOptions.events = eventosFormateados;

                    } else {

                        this.messageService.add({
                            severity: 'warn',
                            detail: 'No hay horario que mostrar'
                        });

                        this.calendarOptions.events = [];

                    }

                } else {

                    this.listaHorarioDocente = [];
                    this.calendarOptions.events = [];

                }

                console.log("Horario Docente\n\n", this.listaHorarioDocente);

            }

        );


        //     const institucion = 'UPSJB';
        //     const grado = 'PREG';
        //     const semestre = '2251';
        //     const docenteID = '1000151224';


        //     function convertirHoraDecimal(horaStr: string): string {
        //         const [hora, minuto] = horaStr.split('.');
        //         const horaFormateada = hora.padStart(2, '0');
        //         const minutoFormateado = minuto?.padEnd(2, '0') || '00';
        //         return `${horaFormateada}:${minutoFormateado}:00`;
        //     }


        //     this._http.get(`/api/PSIGW/RESTListeningConnector/PSFT_CS/SJB_OBT_HORARIO_DOCENTE.v1/HORARIODOCENTE/${institucion}/${grado}/${semestre}/${docenteID}/${this.primerDia}/${this.ultimoDia}`).subscribe(

        //         (res: any) => {

        //             const respuesta = res.SJB_OBT_HORARIO_DOCENTE_RESP;
        //             const horarios = respuesta?.SJB_OBT_HORARIO_DOCENTE_RES;

        //             if (Array.isArray(horarios) && horarios.length > 0) {

        //                 this.messageService.add({
        //                     severity: 'success',
        //                     // summary: 'success',
        //                     detail: 'El horario ha sido actualizado'
        //                 })

        //                 const eventosFormateados = horarios.map((h: any) => {

        //                     const horaInicio = convertirHoraDecimal(h.HORA_INICIO);
        //                     const horaFin = convertirHoraDecimal(h.HORA_FIN);

        //                     return {
        //                         title: h.DESCR || 'Clase',
        //                         start: `${h.MEETING_DT}T${horaInicio}`,
        //                         end: `${h.MEETING_DT}T${horaFin}`,
        //                         allDay: false
        //                     };

        //                 });

        //                 // Asignar todos los eventos de una sola vez
        //                 this.calendarOptions.events = eventosFormateados;

        //             } else {

        //                 this.messageService.add({
        //                     severity: 'warn',
        //                     // summary: 'success',
        //                     detail: 'No hay horario que mostrar'
        //                 });

        //             }


        //             /*
        //             this.events = res.lista.map((evento: any) => {

        //                 const indicadorColor = evento.tipoClase === 'HorasLectivas' ? '#007bff' : '#28a745';

        //                 return {
        //                     title: evento.nombre,
        //                     start: evento.fechaHoraIni,
        //                     end: evento.fechaHoraFin,
        //                     id: evento.id,
        //                     color: indicadorColor
        //                 };

        //             });

        //             this.calendarOptions.events = [...this.events];
        //             */
        //             /*
        //             const respuesta = res.SJB_OBT_HORARIO_DOCENTE_RESP;
        //             const horarios = respuesta?.SJB_OBT_HORARIO_DOCENTE_RES;

        //             console.log('Código:', respuesta?.CodigoRespuesta);
        //             console.log('Mensaje:', respuesta?.MensajeRespuesta);

        //             if (Array.isArray(horarios)) {

        //                 horarios.forEach((horario: any) => {
        //                     console.log('Curso:', horario.DESCR);
        //                     console.log('Fecha:', horario.MEETING_DT);
        //                     console.log('Hora:', horario.HORA_INICIO, 'a', horario.HORA_FIN);
        //                     console.log('------');
        //                 });

        //                 console.log('Total de horarios:', horarios.length);

        //             } else {

        //                 console.log('No hay horarios disponibles.');

        //             }
        //             */

        //         }

        //     );


    }

    consultarConfiguracionHorario() {


        const headers = {
            'country': 'PE',
            'provider': 'integracion',
            'apiKey': 'Z2ZKVS8vMk15SVg5M0Fqdlc5MFY1R2s2alJBbE01Sk9PZWhaV1ovbkhXU2VIRmQ4T0w2UU5wUHZKeWZ5bkg0dA=='
        };


        this._http.getWithHeaders(`https://backdev-campus.upsjb.edu.pe/apisIntegracionesReprogramacionClases/api/v1/integracion/reprogramacion-clases/tabla-horaria/UPSJB/PREG`, headers).subscribe(

            (res: any) => {

                const tabla_horaria = res?.result?.sjB_OBT_TABLA_HORARIA_RESP;

                if (Array.isArray(tabla_horaria?.sjB_OBT_TABLA_HORARIA_RES)) {

                    this.listaTablaHoraria = tabla_horaria.sjB_OBT_TABLA_HORARIA_RES;

                } else {

                    this.listaTablaHoraria = [];

                }

                console.log("Configuración Horario\n\n", this.listaTablaHoraria);

            }

        );

    }

    consultarAmbientesDisponibles() {


        let req = {
            "FechaInicio": "2025-03-06",
            "FechaFinal": "2025-03-06",
            "HoraInicioClase": "18.35",
            "HoraFinClase": "20.05",
            "TipoInstalacion": "LCRT",
            "CodigoUbicacion": "L0034",
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


        this._http.postWithHeaders(req, 'https://backdev-campus.upsjb.edu.pe/apisIntegracionesReprogramacionClases/api/v1/integracion/reprogramacion-clases/ambientes-disponibles', headers).subscribe(

            (res: any) => {

                const ambientes_disponibles = res?.result?.sjB_OBT_DISP_AMBIENTE_RESP;

                if (Array.isArray(ambientes_disponibles?.sjB_OBT_DISP_AMBIENTE_RES)) {

                    this.listaAmbientesDispnibles = ambientes_disponibles.sjB_OBT_DISP_AMBIENTE_RES;

                } else {

                    this.listaAmbientesDispnibles = [];

                }

                console.log("Ambientes Disponibles\n\n", this.listaAmbientesDispnibles);

            }

        );

    }


    popup: boolean = false;
    popupFormulario: boolean = false;
    popupTablaHorarios: boolean = false;


    campoAsignatura: string = '';
    campoComponente: string = '';
    campoFecha: string = '';
    campoHoraIni: string = '';
    campoHoraFin: string = '';
    campoTipoAmbiente: string = '';
    campoAmbiente: string = '';
    campoMotivo: string = '';


    campoAsignaturaVar: boolean = false;
    campoComponenteVar: boolean = false;
    campoFechaVar: boolean = false;
    campoHoraIniVar: boolean = false;
    campoHoraFinVar: boolean = false;
    campoTipoAmbienteVar: boolean = false;
    campoAmbienteVar: boolean = false;
    campoMotivoVar: boolean = false;


    mostrarFormulario(val: any, val2: any) {

        if (val == 1) {

            this.popup = true;
            this.popupFormulario = true;

            this.campoAsignatura = val2.title;

            // this.campoHoraFin = val2.start.toLocaleDateString('es-PE'); 

            // const dia = val2.start.getDate().toString().padStart(2, '0');
            // const mes = (val2.start.getMonth() + 1).toString().padStart(2, '0'); // los meses empiezan en 0
            // const anio = val2.start.getFullYear();
            // this.campoHoraIni = `${dia}-${mes}-${anio}`;


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


    //#endregion


    //#region       FUNCIONES DE PRUEBA


    PruebaEnviarSolicitud() {

        let plantilla = `

            <div style="height: 39rem; width: 30rem; background-color: white; margin: 0 auto; display: flex; flex-direction: column; position: relative; box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1);">

                <img src="assets/img/imagenes/plantilla-correo.png" alt="" style="width: 100%;">

                <div style="flex: 1; padding: 1rem 2rem; font-size: .8rem; font-family: calibri;">
                    <h4>Estimado(a) Docente Melendez Donayre Eric Joel</h4>
                    <p style="text-align: justify;">Le informamos que se ha realizado una reprogramación en una de sus asignaturas del presente semestre. A continuación, se detallan los cambios efectuados:</p>

                    <ul>
                        <li>Programa: Medicina Humana</li>
                        <li>Asignatura: Seminario Integrador I</li>
                        <li>Fecha: 20/06/2025</li>
                        <li>Hora: 10:00am - 12:00pm</li>
                        <li>Local: Chorrillos</li>
                        <li>Ambiente: Aula 204 - Pabellón B</li>
                    </ul>

                    <p>Esta reprogramación responde a necesidades académicas y logísticas con el fin de garantizar el desarrollo óptimo de la clase.</p>

                    <p>Atentamente,</p>
                    <p style="font-weight: 700;">Universidad Privada San Juan Bautista</p>
                </div>

                <div style="position: absolute; bottom: 0; left: 0; background-color: #FF0A41; width: 100%; height: 4rem;"></div>

            </div>        
            
        `;

        let req = {
            destinatario: 'christian.mori@upsjb.edu.pe',
            correoCopia: 'aaronmorivaldivia@gmail.com',
            asunto: 'Asunto',
            nombres: 'Aarón Mori Valdivia',
            cuerpoHTML: plantilla
        }

        this._http.post(req, 'http://localhost:8080/admin-enviar-email').subscribe(

            (res: any) => {

                alert('Solicitud Enviada!');
                console.log(res);
            }

        )

    }


    //#endregion


}
