

export const environment = {


    production: true,


    ClientId: '10570380-15e6-48ee-9277-8c5d17dc19ee',       //  518ad021-0e1d-41b2-b070-3b964e426a27
    TenantId: '13841d5f-968d-4624-a7da-d68a6006a84a',


    URL_REDIRECCION:{
        URL_OFFICE365: 'http://localhost:4200/inicio',
    },


    apiConfig: {
        uri: 'https://graph.microsoft.com/v1.0/me',
        scopes: ['user.read', 'user.readbasic.all'],
    },


    ENDPOINTS: {
        API_SERVICIOS_LOCAL:    'http://localhost:8080/',
        API_SERVICIOS_1:        'https://app.upsjb.edu.pe/reprogramaciones/',
        API_SERVICIOS_2:        'https://api.upsjb.edu.pe/reprogramaciones/',
        API_SERVICIOS_3:        'https://backdev-campus.upsjb.edu.pe/apisIntegracionesReprogramacionClases/',
        API_PERSONA:            'https://app.upsjb.edu.pe/apisIntegracionesAcademico/',
        API_PERSONA_KEY:        'UTdFZStJaWd6ekJ6eW5OQ2dOOU83ZEluTWpheXlEWklrQk0rekN2WWlGRT0=',
    },


    // Agregar para pruebas, en caso de producción dejar en blanco
    // initialAuth: '',                                     // 'KATTY.PALOMINO@UPSJB.EDU.PE',//'me@upsjb.edu.pe',


    initialAuth: '',


};