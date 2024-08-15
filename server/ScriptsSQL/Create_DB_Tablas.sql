create database BibliotecaDB_PTIG;

-- Tabla autor
CREATE TABLE Autor (
    IdAutor INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100),
    Nacionalidad VARCHAR(50)
);

-- Tabla libro
CREATE TABLE Libro (
    IdLibro INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(200),
    Editorial VARCHAR(100),
    Area VARCHAR(100)
);

-- tabla del estudiante
CREATE TABLE Estudiante (
    IdLector INT AUTO_INCREMENT PRIMARY KEY,
    CI VARCHAR(20),
    Nombre VARCHAR(100),
    Direccion VARCHAR(255),
    Carrera VARCHAR(100),
    Edad INT
);

-- tabla prestamo
CREATE TABLE Prestamo (
    IdPrestamo INT AUTO_INCREMENT PRIMARY KEY,
    IdLector INT,
    IdLibro INT,
    FechaPrestamo DATE,
    FechaDevolucion DATE,
    Devuelto BOOLEAN,
    FOREIGN KEY (IdLector) REFERENCES Estudiante(IdLector),
    FOREIGN KEY (IdLibro) REFERENCES Libro(IdLibro)
);

-- tabla intermedia entre Libro y Autor
CREATE TABLE LibAut (
    IdAutor INT,
    IdLibro INT,
    PRIMARY KEY (IdAutor, IdLibro),
    FOREIGN KEY (IdAutor) REFERENCES Autor(IdAutor),
    FOREIGN KEY (IdLibro) REFERENCES Libro(IdLibro)
);
