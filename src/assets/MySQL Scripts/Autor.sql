DROP TABLE IF EXISTS autor;
DROP TABLE IF EXISTS obra;

CREATE TABLE IF NOT EXISTS autor(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT,genero TEXT,img TEXT);
INSERT or IGNORE INTO autor VALUES (1, 'Isabel Allende', 'novela', 'https://pbs.twimg.com/profile_images/463808864517750787/pGM4PbbM_normal.jpeg');
INSERT or IGNORE INTO autor VALUES (2, 'Laura Gallego', 'novela', 'https://pm1.narvii.com/6370/7994188782b192c89e5ba8c69f60f879a5df187b_128.jpg');
INSERT or IGNORE INTO autor VALUES (3, 'Carlos Cuatemoc', 'autoayuda', 'https://static-1.ivoox.com/audios/2/2/1/9/8101475079122_XS.jpg');
 
CREATE TABLE IF NOT EXISTS obra(id INTEGER PRIMARY KEY AUTOINCREMENT,titulo TEXT, autorId INTEGER);
INSERT or IGNORE INTO obra(id, titulo, autorId) VALUES (1, 'La casa de los espiritus', 1);
INSERT or IGNORE INTO obra(id, titulo, autorId) VALUES (2, 'Inés del alma mía', 1);
INSERT or IGNORE INTO obra(id, titulo, autorId) VALUES (3, 'Donde los árboles cantan', 2);
