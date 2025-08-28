import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-inicio',
    standalone: false,
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css'
})


export class InicioComponent implements OnInit {


    listaSolicitudes: any[] = [];
    listaEstados: any[] = [];
    listaSolicitudDetalle: any = [];


    campoAsignatura: string = '';
    campoComponente: string = '';
    campoFecha: string = '';
    campoHoraIni: string = '';
    campoHoraFin: string = '';
    campoAmbiente: string = '';
    campoMotivo: string = '';


    campoAsignaturaVar: boolean = false;
    campoComponenteVar: boolean = false;
    campoFechaVar: boolean = false;
    campoHoraIniVar: boolean = false;
    campoHoraFinVar: boolean = false;
    campoAmbienteVar: boolean = false;
    campoMotivoVar: boolean = false;


    constructor(
        private _router: Router,
    ) {}


    ngOnInit(): void {

        this.llamarSolicitudes();

    }


    //#region       FUNCIONES


    llamarSolicitudes() {

        let solicitudes = [
            {
                semestre: '2025-2',
                programa: 'Ingeniería de Sistemas',
                local: 'Chorrillos',
                asignatura: 'Diseño y Producción Asistido por Computadora',
                docente: 'Lucía Fernández Salas',
                componente: 'Práctica',
                tipoAmbiente: 'Taller',
                ambiente: 'H110',
                fecha: '20-07-2025',
                horaIni: '10:00',
                horaFin: '11:00',
                motivo: 'Solicitud del docente',
            },
            {
                semestre: '2025-2',
                programa: 'Ingeniería de Sistemas',
                local: 'Chorrillos',
                asignatura: 'Base de Datos',
                docente: 'Jorge Estrella Cárdenas',
                componente: 'Teoría',
                tipoAmbiente: 'Taller',
                ambiente: 'H112',
                fecha: '31-07-2025',
                horaIni: '10:00',
                horaFin: '11:00',
                motivo: 'Solicitud del docente',
            },
            {
                semestre: '2025-1',
                programa: 'Ingeniería de Sistemas',
                local: 'Chincha',
                asignatura: 'Base de Datos',
                docente: 'Jorge Estrella Cárdenas',
                componente: 'Teoría',
                tipoAmbiente: 'Taller',
                ambiente: 'H112',
                fecha: '31-07-2025',
                horaIni: '10:00',
                horaFin: '11:00',
                motivo: 'Solicitud del docente',
            },
            {
                semestre: '2025-2',
                programa: 'Administración de Empresas',
                local: 'San Borja',
                asignatura: 'Contabilidad General',
                docente: 'María López García',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'B201',
                fecha: '05-08-2025',
                horaIni: '08:00',
                horaFin: '09:30',
                motivo: 'Solicitud administrativa',
            },
            {
                semestre: '2025-1',
                programa: 'Arquitectura',
                local: 'Chorrillos',
                asignatura: 'Diseño Arquitectónico',
                docente: 'Carlos Ramírez Díaz',
                componente: 'Práctica',
                tipoAmbiente: 'Taller',
                ambiente: 'H120',
                fecha: '12-06-2025',
                horaIni: '14:00',
                horaFin: '16:00',
                motivo: 'Reprogramación de clase',
            },
            {
                semestre: '2025-1',
                programa: 'Ingeniería Industrial',
                local: 'San Borja',
                asignatura: 'Gestión de Operaciones',
                docente: 'Ana Torres Castillo',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'C305',
                fecha: '20-06-2025',
                horaIni: '09:00',
                horaFin: '11:00',
                motivo: 'Cambio de horario',
            },
            {
                semestre: '2025-2',
                programa: 'Ingeniería de Sistemas',
                local: 'San Borja',
                asignatura: 'Programación Avanzada',
                docente: 'Luis Gutiérrez Rojas',
                componente: 'Laboratorio',
                tipoAmbiente: 'Laboratorio',
                ambiente: 'Lab102',
                fecha: '15-08-2025',
                horaIni: '13:00',
                horaFin: '15:00',
                motivo: 'Solicitud de laboratorio',
            },
            {
                semestre: '2025-2',
                programa: 'Administración de Empresas',
                local: 'Chincha',
                asignatura: 'Economía General',
                docente: 'Sofía Mendoza Quispe',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'A101',
                fecha: '10-08-2025',
                horaIni: '08:00',
                horaFin: '10:00',
                motivo: 'Clase adicional',
            },
            {
                semestre: '2025-1',
                programa: 'Arquitectura',
                local: 'San Borja',
                asignatura: 'Historia del Arte',
                docente: 'Fernando Aguilar Soto',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'B105',
                fecha: '22-06-2025',
                horaIni: '11:00',
                horaFin: '13:00',
                motivo: 'Clase especial',
            },
            {
                semestre: '2025-1',
                programa: 'Ingeniería Industrial',
                local: 'Chincha',
                asignatura: 'Investigación de Operaciones',
                docente: 'Paula Sánchez León',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'H210',
                fecha: '30-06-2025',
                horaIni: '09:00',
                horaFin: '11:00',
                motivo: 'Cambio de salón',
            },
            {
                semestre: '2025-2',
                programa: 'Ingeniería de Sistemas',
                local: 'San Borja',
                asignatura: 'Inteligencia Artificial',
                docente: 'Héctor Morales Vega',
                componente: 'Laboratorio',
                tipoAmbiente: 'Laboratorio',
                ambiente: 'Lab205',
                fecha: '17-08-2025',
                horaIni: '15:00',
                horaFin: '17:00',
                motivo: 'Uso de equipo especial',
            },
            {
                semestre: '2025-2',
                programa: 'Arquitectura',
                local: 'San Borja',
                asignatura: 'Urbanismo',
                docente: 'Verónica Chávez Ramos',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'C202',
                fecha: '25-08-2025',
                horaIni: '08:00',
                horaFin: '10:00',
                motivo: 'Clase magistral',
            },
            {
                semestre: '2025-1',
                programa: 'Ingeniería Industrial',
                local: 'San Borja',
                asignatura: 'Logística y Distribución',
                docente: 'Andrés Peña Lazo',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'C102',
                fecha: '18-06-2025',
                horaIni: '14:00',
                horaFin: '16:00',
                motivo: 'Reemplazo de docente',
            },
            {
                semestre: '2025-1',
                programa: 'Administración de Empresas',
                local: 'Chorrillos',
                asignatura: 'Marketing Estratégico',
                docente: 'Gabriela Flores Medina',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'A203',
                fecha: '28-06-2025',
                horaIni: '10:00',
                horaFin: '12:00',
                motivo: 'Invitación de ponente externo',
            },
            {
                semestre: '2025-2',
                programa: 'Ingeniería de Sistemas',
                local: 'San Borja',
                asignatura: 'Seguridad Informática',
                docente: 'Diego Ruiz Campos',
                componente: 'Laboratorio',
                tipoAmbiente: 'Laboratorio',
                ambiente: 'Lab305',
                fecha: '14-08-2025',
                horaIni: '16:00',
                horaFin: '18:00',
                motivo: 'Práctica de laboratorio',
            },
            {
                semestre: '2025-1',
                programa: 'Arquitectura',
                local: 'Chorrillos',
                asignatura: 'Estructuras',
                docente: 'Borja Paredes Vargas',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'H115',
                fecha: '21-06-2025',
                horaIni: '08:00',
                horaFin: '10:00',
                motivo: 'Cambio de aula',
            },
            {
                semestre: '2025-1',
                programa: 'Ingeniería Industrial',
                local: 'San Borja',
                asignatura: 'Control de Calidad',
                docente: 'Patricia Ramos Torres',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'B304',
                fecha: '26-06-2025',
                horaIni: '13:00',
                horaFin: '15:00',
                motivo: 'Clase adicional',
            },
            {
                semestre: '2025-2',
                programa: 'Administración de Empresas',
                local: 'San Borja',
                asignatura: 'Gestión de Recursos Humanos',
                docente: 'Ricardo Salazar Huamán',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'C401',
                fecha: '09-08-2025',
                horaIni: '10:00',
                horaFin: '12:00',
                motivo: 'Reprogramación por feriado',
            },
            {
                semestre: '2025-2',
                programa: 'Ingeniería de Sistemas',
                local: 'Chorrillos',
                asignatura: 'Redes de Computadoras',
                docente: 'Esteban Castillo Rivas',
                componente: 'Laboratorio',
                tipoAmbiente: 'Laboratorio',
                ambiente: 'Lab101',
                fecha: '11-08-2025',
                horaIni: '09:00',
                horaFin: '11:00',
                motivo: 'Mantenimiento de equipo',
            },
            {
                semestre: '2025-1',
                programa: 'Arquitectura',
                local: 'San Borja',
                asignatura: 'Construcción Sostenible',
                docente: 'Natalia Campos Alarcón',
                componente: 'Teoría',
                tipoAmbiente: 'Aula',
                ambiente: 'B108',
                fecha: '19-06-2025',
                horaIni: '15:00',
                horaFin: '17:00',
                motivo: 'Invitación de experto externo',
            }
        ];

        this.listaSolicitudes = solicitudes;

        const estadosUnicos = new Set<string>();

        for (let i = 0; i < this.listaSolicitudes.length; i++) {

            const estado = this.listaSolicitudes[i].estado;
            estadosUnicos.add(estado);

        }

        this.listaEstados = Array.from(estadosUnicos);

        console.log(this.listaSolicitudes);

    }

    redirigirCalendario() {
        this._router.navigate(['/u/docente/calendario']);
    }


    //#endregion


    //#region       PAGINADOR Y FILTROS                 



    filtro: string = '';
    estadoFiltro: string = '';
    itemsPorPagina: number = 10;
    paginaActual: number = 1;


    get procedimientosFiltrados() {

        return this.listaSolicitudes.filter(item => {

            const textoCoincide =
                (item.semestre ?? '').toLowerCase().includes(this.filtro.toLowerCase()) ||
                (item.programa ?? '').toLowerCase().includes(this.filtro.toLowerCase()) ||
                (item.local ?? '').toLowerCase().includes(this.filtro.toLowerCase()) ||
                (item.asignatura ?? '').toLowerCase().includes(this.filtro.toLowerCase()) ||
                (item.ambiente ?? '').toLowerCase().includes(this.filtro.toLowerCase());

            return textoCoincide;

        });

    }

    get totalPaginas(): number {
        return Math.ceil(this.procedimientosFiltrados.length / this.itemsPorPagina);
    }

    get procedimientosPaginados() {
        const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
        const fin = inicio + this.itemsPorPagina;
        return this.procedimientosFiltrados.slice(inicio, fin);
    }

    cambiarPagina(nuevaPagina: number) {
        if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
            this.paginaActual = nuevaPagina;
        }
    }



    //#endregion


}