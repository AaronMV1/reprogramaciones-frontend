

export const environment = {


    production: false,


    ClientId: '05ff045e-ff04-4985-a64c-1750e8e8e954',
    TenantId: '13841d5f-968d-4624-a7da-d68a6006a84a',


    URL_REDIRECCION:{
        URL_OFFICE365: '',
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


    initialAuth: undefined,


};