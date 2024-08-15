ALTER TABLE Libro
ADD COLUMN Cantidad INT DEFAULT 1;

INSERT INTO Autor (Nombre, Nacionalidad) VALUES 
('James Dashner', 'estadounidense'),
('J.K. Rowling', 'britanica'),
('George R. R. Martin', 'estadounidense'),
('Brandon Sanderson', 'estadounidense'),
('J R. R. Tolkien', 'britanico');

INSERT INTO Libro (Titulo, Editorial, Area, Cantidad) VALUES 
('Maze Runner', 'V&R', 'Juvenil', 3),
('Harry Potter y la piedra filosofal', 'Salamandra', 'Fantasia', 5),
('Juego de Tronos', 'Plaza & Janes', 'Fantasia Epica', 2),
('El camino de los Reyes', 'Nova', 'Fantasia Epica', 4),
('El Hobbit', 'Minotauro', 'Fantasia Epica', 2);

INSERT INTO Estudiante (CI, Nombre, Direccion, Carrera, Edad) VALUES 
('11111', 'Byron Ovalle', 'direccion 1', 'Ing de Sistemas', 21),
('22222', 'Maria Gómez', 'direccion 2', 'Derecho', 22),
('33333', 'Pedro Sanchez', 'direccion 3', 'Medicina', 23),
('44444', 'Ana Lopez', 'direccion 4', 'Arquitectura', 24),
('55555', 'Sophia Lopez', 'direccion 5', 'Ing Civil', 25);

INSERT INTO Prestamo (IdLector, IdLibro, FechaPrestamo, FechaDevolucion, Devuelto) VALUES 
(1, 1, '2024-08-01', '2024-08-12', 0),
(2, 2, '2024-08-02', '2024-08-14', 0),
(3, 3, '2024-08-03', '2024-08-16', 1),
(4, 4, '2024-08-04', '2024-08-18', 0),
(5, 5, '2024-08-05', '2024-08-20', 1);

INSERT INTO LibAut (IdAutor, IdLibro) VALUES 
(1, 1),
(2, 2), 
(3, 3), 
(4, 4), 
(5, 5);
