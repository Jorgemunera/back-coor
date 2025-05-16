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
