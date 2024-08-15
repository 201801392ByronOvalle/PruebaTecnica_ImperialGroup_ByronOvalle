const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// datos db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cayala_1607",
    database: "bibliotecadb_ptig"
});

// listar libros
app.get("/libros", (req, res) => {
    db.query("SELECT * FROM Libro", (err, result) => {
        if (err) {
            console.error("Error al obtener la lista de libros:", err);
            res.status(500).send("Error al obtener la lista de libros");
        } else {
            res.send(result);
        }
    });
});

// busqueda de estudiante
app.get("/estudiante/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    db.query("SELECT * FROM Estudiante WHERE Nombre = ?", [nombre], (err, result) => {
        if (err) {
            console.error("Error al buscar estudiante:", err);
            res.status(500).send("Error al buscar estudiante");
        } else if (result.length === 0) {
            res.status(404).send("Estudiante no encontrado");
        } else {
            res.send(result[0]);
        }
    });
});

// registrar prestamo y sus validaciones
app.post("/prestamo", (req, res) => {
    const { idLector, idLibro, fechaPrestamo, devuelto } = req.body;

    if (!idLector || !idLibro || !fechaPrestamo) {
        return res.status(400).send("Faltan datos necesarios para registrar el préstamo");
    }

    db.query("SELECT COUNT(*) AS prestamos FROM Prestamo WHERE IdLibro = ? AND Devuelto = 0", [idLibro], (err, result) => {
        if (err) {
            console.error("Error al verificar disponibilidad del libro:", err);
            return res.status(500).send("Error al verificar disponibilidad del libro");
        }

        const prestamos = result[0].prestamos;

        db.query("SELECT * FROM Libro WHERE IdLibro = ?", [idLibro], (err, result) => {
            if (err) {
                console.error("Error al obtener el libro:", err);
                return res.status(500).send("Error al obtener el libro");
            }

            if (result.length === 0) {
                return res.status(404).send("Libro no encontrado");
            }

            const cantidadLibros = result[0].Cantidad || 1; 
            if (prestamos >= cantidadLibros) {
                return res.status(400).send("NO HAY DISPONIBILIDAD, SELECCIONAR OTRA FECHA");
            } else {
                // mandar el prestamo
                db.query(
                    "INSERT INTO Prestamo (IdLector, IdLibro, FechaPrestamo, Devuelto) VALUES (?, ?, ?, ?)",
                    [idLector, idLibro, fechaPrestamo, devuelto],
                    (err, result) => {
                        if (err) {
                            console.error("Error al registrar el préstamo:", err);
                            return res.status(500).send("Error al registrar el préstamo");
                        } else {
                            res.send("Préstamo registrado con éxito");
                        }
                    }
                );
            }
        });
    });
});

// listar prestamos
app.get("/prestamos", (req, res) => {
    db.query("SELECT * FROM Prestamo", (err, result) => {
        if (err) {
            console.error("Error al obtener la lista de préstamos:", err);
            res.status(500).send("Error al obtener la lista de préstamos");
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});
