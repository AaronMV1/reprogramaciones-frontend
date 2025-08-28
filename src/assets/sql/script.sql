


CREATE TABLE reprogramaciones.usuario (
	id SERIAL PRIMARY KEY,
	nombres VARCHAR(100),
    apellidos VARCHAR(100),
    perfil VARCHAR(50),
    correo VARCHAR(100),
	activo BOOLEAN,
	usuario_responsable VARCHAR(50));
    
CREATE TABLE reprogramaciones.configuracion (
    id SERIAL PRIMARY KEY,
    limite INTEGER,
    plazo INTEGER,
    cdocente BOOLEAN,
    calumno BOOLEAN,
    cdoa BOOLEAN,
    ccoordinador BOOLEAN);


INSERT INTO reprogramaciones.usuario 
    (nombres, apellidos, perfil, correo, activo, usuario_responsable)
VALUES 
    ('Carlos Eduardo', 'Ramírez Soto', 'DOA', 'carlos.ramirez@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Lucía Fernanda', 'Pérez Ríos', 'DOA', 'lucia.perez@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('María José', 'Delgado León', 'DOA', 'maria.delgado@upsjb.edu.pe', false, 'nombre.apellido@upsjb.edu.pe'),
    ('Javier Antonio', 'Gómez Vidal', 'DOA', 'javier.gomez@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Ana Isabel', 'Torres Cárdenas', 'DOA', 'ana.torres@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Diego Martín', 'Reyes Camargo', 'DOA', 'diego.reyes@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Valeria Sofía', 'Morales Luna', 'DOA', 'valeria.morales@upsjb.edu.pe', false, 'nombre.apellido@upsjb.edu.pe'),
    ('Luis Alberto', 'Salazar Huamán', 'DOA', 'luis.salazar@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Camila Andrea', 'Rojas Paredes', 'DOA', 'camila.rojas@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Fernando José', 'Quispe Vargas', 'DOA', 'fernando.quispe@upsjb.edu.pe', false, 'nombre.apellido@upsjb.edu.pe'),
    ('Isabela Ruth', 'Carranza Díaz', 'DOA', 'isabela.carranza@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Andrés Felipe', 'Mejía Ortiz', 'DOA', 'andres.mejia@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Patricia Elena', 'López Medina', 'DOA', 'patricia.lopez@upsjb.edu.pe', false, 'nombre.apellido@upsjb.edu.pe'),
    ('Esteban Gabriel', 'Sánchez Bravo', 'DOA', 'esteban.sanchez@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Daniela Ivonne', 'Vargas Espinoza', 'DOA', 'daniela.vargas@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Rodrigo Manuel', 'Cáceres Pinto', 'DOA', 'rodrigo.caceres@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Karina Fabiola', 'Gutiérrez Zegarra', 'DOA', 'karina.gutierrez@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Julio César', 'Navarro Rivas', 'DOA', 'julio.navarro@upsjb.edu.pe', false, 'nombre.apellido@upsjb.edu.pe'),
    ('Gabriela Antonia', 'Silva Aguirre', 'DOA', 'gabriela.silva@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe'),
    ('Álvaro Ignacio', 'Castro Aliaga', 'DOA', 'alvaro.castro@upsjb.edu.pe', true, 'nombre.apellido@upsjb.edu.pe');

INSERT INTO reprogramaciones.configuracion
    (limite, plazo, cdocente, calumno, cdoa, ccoordinador)
VALUES 
    (3, 5, true, true, true, true);


SELECT * FROM reprogramaciones.usuario;
SELECT * FROM reprogramaciones.configuracion;


