-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-08-13 14:49:33.699

-- tables
-- Table: Butacas
CREATE TABLE Butacas (
    id_butaca int  NOT NULL,
    fila char  NOT NULL,
    columna int  NOT NULL,
    id_sala int  NOT NULL,
    CONSTRAINT Butacas_pk PRIMARY KEY (id_butaca)
);

-- Table: Cargos
CREATE TABLE Cargos (
    id_cargo SERIAL NOT NULL,
    nombre_cargo varchar(30) NOT NULL,
    descripcion_cargo varchar(50) NOT NULL,
    CONSTRAINT Cargos_pk PRIMARY KEY (id_cargo)
);

-- Table: Carteleras
CREATE TABLE Carteleras (
    id_cartelera int  NOT NULL,
    id_cine int  NOT NULL,
    CONSTRAINT Carteleras_pk PRIMARY KEY (id_cartelera)
);

-- Table: Carteleras_Cines
CREATE TABLE Carteleras_Cines (
    id_cartelera int  NOT NULL,
    id_pelicula int  NOT NULL,
    fecha_desde date  NOT NULL,
    fecha_hasta date  NOT NULL,
    id_cine int  NOT NULL,
    CONSTRAINT Carteleras_Cines_pk PRIMARY KEY (id_cartelera,id_pelicula)
);

-- Table: Cines
CREATE TABLE Cines (
    id_cine int  NOT NULL,
    nombre_cine int  NOT NULL,
    id_ubicacion int  NOT NULL,
    CONSTRAINT Cines_pk PRIMARY KEY (id_cine)
);

-- Table: Comidas_Cines
CREATE TABLE Comida_Cine (
    id_menu int  NOT NULL,
    precio money  NOT NULL,
    cantidad_disponible int  NOT NULL,
    id_comida int  NOT NULL,
    id_cine int  NOT NULL,
    CONSTRAINT Comida_Cine_pk PRIMARY KEY (id_menu)
);

-- Table: Comidas
CREATE TABLE Comidas (
    id_comida int  NOT NULL,
    nombre_comida varchar(30)  NOT NULL,
    id_tipo_comida int  NOT NULL,
    CONSTRAINT Comidas_pk PRIMARY KEY (id_comida)
);

-- Table: Funciones
CREATE TABLE Funciones (
    id_funcion int  NOT NULL,
    id_horario int  NOT NULL,
    id_sala int  NOT NULL,
    CONSTRAINT Funciones_pk PRIMARY KEY (id_funcion)
);

-- Table: Generos
CREATE TABLE Generos (
    id_genero int  NOT NULL,
    nombre_genero varchar(30)  NOT NULL,
    CONSTRAINT asd PRIMARY KEY (id_genero)
);

-- Table: Horarios
CREATE TABLE Horarios (
    id_horario int  NOT NULL,
    fecha date  NOT NULL,
    hora time  NOT NULL,
    id_pelicula int  NOT NULL,
    CONSTRAINT Horarios_pk PRIMARY KEY (id_horario)
);

-- Table: Peliculas
CREATE TABLE Peliculas (
    id_pelicula int  NOT NULL,
    nombre_pelicula varchar(30)  NOT NULL,
    duracion_pelicula time  NOT NULL,
    id_genero int  NOT NULL,
    CONSTRAINT Peliculas_pk PRIMARY KEY (id_pelicula)
);

-- Table: Personas
CREATE TABLE Personas (
   id_persona SERIAL NOT NULL,  -- Cambiado a SERIAL para auto-incremento
   nombre_persona varchar(30) NOT NULL,
   fecha_nacimiento_persona date NOT NULL,
   id_ubicacion int NOT NULL,
   id_cine int NULL,
   id_cargo int NOT NULL,
   id_usuario int NOT NULL,
   CONSTRAINT Personas_pk PRIMARY KEY (id_persona)
);


-- Table: Reservaciones
CREATE TABLE Reservaciones (
    id_reservacion int  NOT NULL,
    id_persona int  NOT NULL,
    id_butaca int  NOT NULL,
    id_funcion int  NOT NULL,
    CONSTRAINT Reservaciones_pk PRIMARY KEY (id_reservacion)
);

-- Table: Salas
CREATE TABLE Salas (
    id_sala int  NOT NULL,
    sala_capacidad int  NOT NULL,
    id_cine int  NOT NULL,
    CONSTRAINT Salas_pk PRIMARY KEY (id_sala)
);

-- Table: Tipos_Comida
CREATE TABLE Tipos_Comida (
    id_tipo_comida int  NOT NULL,
    nombre_tipo_comida varchar(30)  NOT NULL,
    descripcion varchar(200)  NOT NULL,
    CONSTRAINT Tipos_Comida_pk PRIMARY KEY (id_tipo_comida)
);

-- Table: Ubicaciones
CREATE TABLE Ubicaciones (
    id_ubicacion int  NOT NULL,
    nombre_ubicacion int  NOT NULL,
    id_padre int  NULL,
    CONSTRAINT Ubicaciones_pk PRIMARY KEY (id_ubicacion)
);

-- Table: usuarios
CREATE TABLE Usuarios (
   id_usuario int  NOT NULL,
   correo varchar(50)  NOT NULL,
   contrasena varchar(50)  NOT NULL,
   CONSTRAINT usuario_pk PRIMARY KEY (id_usuario)
);

-- foreign keys
-- Reference: Butacas_Salas (table: Butacas)
ALTER TABLE Butacas ADD CONSTRAINT Butacas_Salas
    FOREIGN KEY (id_sala)
    REFERENCES Salas (id_sala)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Carteleras_Cines (table: Carteleras)
ALTER TABLE Carteleras ADD CONSTRAINT Carteleras_Cines
    FOREIGN KEY (id_cine)
    REFERENCES Cines (id_cine)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Carteleras_Cines_Carteleras (table: Carteleras_Cines)
ALTER TABLE Carteleras_Cines ADD CONSTRAINT Carteleras_Cines_Carteleras
    FOREIGN KEY (id_cartelera)
    REFERENCES Carteleras (id_cartelera)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Carteleras_Cines_Cines (table: Carteleras_Cines)
ALTER TABLE Carteleras_Cines ADD CONSTRAINT Carteleras_Cines_Cines
    FOREIGN KEY (id_cine)
    REFERENCES Cines (id_cine)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Carteleras_Cines_Peliculas (table: Carteleras_Cines)
ALTER TABLE Carteleras_Cines ADD CONSTRAINT Carteleras_Cines_Peliculas
    FOREIGN KEY (id_pelicula)
    REFERENCES Peliculas (id_pelicula)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Cines_id_ubicacion (table: Cines)
ALTER TABLE Cines ADD CONSTRAINT Cines_id_ubicacion
    FOREIGN KEY (id_ubicacion)
    REFERENCES Ubicaciones (id_ubicacion)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Comidas_Tipos_Comida (table: Comidas)
ALTER TABLE Comidas ADD CONSTRAINT Comidas_Tipos_Comida
    FOREIGN KEY (id_tipo_comida)
    REFERENCES Tipos_Comida (id_tipo_comida)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Funciones_Horarios (table: Funciones)
ALTER TABLE Funciones ADD CONSTRAINT Funciones_Horarios
    FOREIGN KEY (id_horario)
    REFERENCES Horarios (id_horario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Funciones_Salas (table: Funciones)
ALTER TABLE Funciones ADD CONSTRAINT Funciones_Salas
    FOREIGN KEY (id_sala)
    REFERENCES Salas (id_sala)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Horarios_Peliculas (table: Horarios)
ALTER TABLE Horarios ADD CONSTRAINT Horarios_Peliculas
    FOREIGN KEY (id_pelicula)
    REFERENCES Peliculas (id_pelicula)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Menus_restaurantes_Cines (table: Comida_Cine)
ALTER TABLE Comida_Cine ADD CONSTRAINT Menus_restaurantes_Cines
    FOREIGN KEY (id_cine)
    REFERENCES Cines (id_cine)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Menus_restaurantes_Comidas (table: Comida_Cine)
ALTER TABLE Comida_Cine ADD CONSTRAINT Menus_restaurantes_Comidas
    FOREIGN KEY (id_comida)
    REFERENCES Comidas (id_comida)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Peliculas_Generos (table: Peliculas)
ALTER TABLE Peliculas ADD CONSTRAINT Peliculas_Generos
    FOREIGN KEY (id_genero)
    REFERENCES Generos (id_genero)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Personas_Cargos (table: Personas)
ALTER TABLE Personas ADD CONSTRAINT Personas_Cargos
    FOREIGN KEY (id_cargo)
    REFERENCES Cargos (id_cargo)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Personas_Cines (table: Personas)
ALTER TABLE Personas ADD CONSTRAINT Personas_Cines
    FOREIGN KEY (id_cine)
    REFERENCES Cines (id_cine)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Personas_id_ubicacion (table: Personas)
ALTER TABLE Personas ADD CONSTRAINT Personas_id_ubicacion
    FOREIGN KEY (id_ubicacion)
    REFERENCES Ubicaciones (id_ubicacion)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Reservaciones_Butacas (table: Reservaciones)
ALTER TABLE Reservaciones ADD CONSTRAINT Reservaciones_Butacas
    FOREIGN KEY (id_butaca)
    REFERENCES Butacas (id_butaca)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Reservaciones_Funciones (table: Reservaciones)
ALTER TABLE Reservaciones ADD CONSTRAINT Reservaciones_Funciones
    FOREIGN KEY (id_funcion)
    REFERENCES Funciones (id_funcion)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Reservaciones_Personas (table: Reservaciones)
ALTER TABLE Reservaciones ADD CONSTRAINT Reservaciones_Personas
    FOREIGN KEY (id_persona)
    REFERENCES Personas (id_persona)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Salas_Cines (table: Salas)
ALTER TABLE Salas ADD CONSTRAINT Salas_Cines
    FOREIGN KEY (id_cine)
    REFERENCES Cines (id_cine)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: id_ubicacion_id_ubicacion (table: Ubicaciones)
ALTER TABLE Ubicaciones ADD CONSTRAINT id_ubicacion_id_ubicacion
    FOREIGN KEY (id_padre)
    REFERENCES Ubicaciones (id_ubicacion)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;


-- Reference: Personas_usuarios (table: Personas)
ALTER TABLE Personas ADD CONSTRAINT Personas_usuario
   FOREIGN KEY (id_usuario)
   REFERENCES usuarios (id_usuario)  
   NOT DEFERRABLE 
   INITIALLY IMMEDIATE
;

-- End of file.

