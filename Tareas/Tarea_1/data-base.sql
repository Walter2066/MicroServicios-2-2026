CREATE DATABASE IF NOT EXISTS bd_elecciones
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE bd_elecciones;

CREATE TABLE IF NOT EXISTS cargos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS lugar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS candidatos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ci VARCHAR(12) NOT NULL UNIQUE,
    nombres VARCHAR(60) NOT NULL,
    apellido1 VARCHAR(30) NOT NULL,
    apellido2 VARCHAR(40),
    cargo_id INT NOT NULL,
    lugar_id INT NOT NULL,

    CONSTRAINT fk_candidato_cargo
        FOREIGN KEY (cargo_id) REFERENCES cargos(id),

    CONSTRAINT fk_candidato_lugar
        FOREIGN KEY (lugar_id) REFERENCES lugar(id)
);

INSERT INTO cargos (id, nombre) VALUES
(1, 'Presidente'),
(2, 'Vicepresidente'),
(3, 'Secretario'),
(4, 'Tesorero')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

INSERT INTO lugar (id, nombre) VALUES
(1, 'Sucre'),
(2, 'Potosi'),
(3, 'Tarija'),
(4, 'La Paz')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

INSERT INTO candidatos
(ci, nombres, apellido1, apellido2, cargo_id, lugar_id)
VALUES
('12345678', 'Juan Carlos', 'Perez', 'Lopez', 1, 1),
('23456789', 'Maria Elena', 'Gomez', 'Rojas', 2, 3),
('34567890', 'Pedro Antonio', 'Flores', 'Mamani', 3, 4),
('45678901', 'Ana Maria', 'Rojas', 'Vargas', 4, 2),
('56789012', 'Carlos Alberto', 'Mendez', 'Cruz', 1, 3),
('67890123', 'Lucia Fernanda', 'Torrez', 'Diaz', 3, 1),
('78901234', 'Roberto Daniel', 'Vargas', 'Soto', 2, 4),
('89012345', 'Gabriela Isabel', 'Mamani', 'Quispe', 4, 2)
ON DUPLICATE KEY UPDATE
nombres = VALUES(nombres),
apellido1 = VALUES(apellido1),
apellido2 = VALUES(apellido2),
cargo_id = VALUES(cargo_id),
lugar_id = VALUES(lugar_id);