INSERT INTO accuraat_settings (name, email) 
VALUES ('Accuraat', 'sander.mailservice@gmail.com');

INSERT INTO accuraat_role (id, name, description) 
VALUES (1, 'Admin', 'Administrator with all permissions');

INSERT INTO accuraat_permission (action, type, entity) 
VALUES ('all', 'all', 'all');

INSERT INTO accuraat_rolesToPermissions (permission_id,  role_id) 
VALUES (1, 1);

INSERT INTO accuraat_user (id, name, email, role_id) VALUES (1, 'Sander', 'sanderontwikkelt@gmail.com', 1);

INSERT INTO accuraat_permission (id, type, entity, action) VALUES (2, 'write', 'user', 'create');
INSERT INTO accuraat_permission (id, type, entity, action) VALUES (3, 'write', 'user', 'update');
INSERT INTO accuraat_permission (id, type, entity, action) VALUES (4, 'write', 'user', 'delete');
INSERT INTO accuraat_permission (id, type, entity, action) VALUES (5, 'read', 'user', 'get');

INSERT INTO accuraat_permission (id, type, entity, action) VALUES (6, 'write', 'role', 'create');
INSERT INTO accuraat_permission (id, type, entity, action) VALUES (7, 'write', 'role', 'update');
INSERT INTO accuraat_permission (id, type, entity, action) VALUES (8, 'write', 'role', 'delete');
INSERT INTO accuraat_permission (id, type, entity, action) VALUES (9, 'read', 'role', 'get');