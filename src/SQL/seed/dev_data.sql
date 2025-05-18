-- dev_data.sql
-- Datos de prueba (sin usuarios)

-- Rutas
INSERT INTO routes (name, description) VALUES
('Ruta Sur', 'Cobertura en la zona sur de la ciudad'),
('Ruta Oriente', 'Entrega en barrios del oriente'),
('Ruta Occidente', 'Entregas en la zona industrial y residencial del occidente');

-- Transportistas
INSERT INTO transporters (name, capacity, is_available) VALUES
('Laura Gómez', 85, 1),
('Miguel Ríos', 120, 1),
('Ana Beltrán', 70, 1);

-- Usuarios de prueba
INSERT INTO users (name, email, password, role) VALUES
('Jorge Admin', 'gerjo9211@hotmail.com', '$2b$10$mYGexsYQvkV5r9viKqee9uc2nq7B79QW39DtEQeN/yln8Iboaicg6', 'admin'),
('Jorge User', 'gerjo9211@gmail.com', '$2b$10$vaA6lftv69SM1dA4M29CbOmFpcGBjQurPQD6GfWWbYc5sH168CS.W', 'user');
