INSERT INTO physis_settings (name, email) 
VALUES ('Sockwave', 'sander.mailservice@gmail.com');

INSERT INTO physis_role (id, name, description) 
VALUES (1, 'Admin', 'Administrator with all permissions');

INSERT INTO physis_permission (action, type, entity) 
VALUES ('all', 'all', 'all');

INSERT INTO physis_rolesToPermissions (permission_id,  role_id) 
VALUES (1, 1);

INSERT INTO physis_user (id, name, email, role_id) VALUES (1, 'Sander', 'sanderontwikkelt@gmail.com', 1);

INSERT INTO physis_permission (id, type, entity, action) VALUES (1, 'all', 'all', 'all');

INSERT INTO physis_permission (id, type, entity, action) VALUES (2, 'write', 'user', 'create');
INSERT INTO physis_permission (id, type, entity, action) VALUES (3, 'write', 'user', 'update');
INSERT INTO physis_permission (id, type, entity, action) VALUES (4, 'write', 'user', 'delete');
INSERT INTO physis_permission (id, type, entity, action) VALUES (5, 'read', 'user', 'get');

INSERT INTO physis_permission (id, type, entity, action) VALUES (6, 'write', 'role', 'create');
INSERT INTO physis_permission (id, type, entity, action) VALUES (7, 'write', 'role', 'update');
INSERT INTO physis_permission (id, type, entity, action) VALUES (8, 'write', 'role', 'delete');
INSERT INTO physis_permission (id, type, entity, action) VALUES (9, 'read', 'role', 'get');