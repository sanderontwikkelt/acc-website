INSERT INTO physis_settings (name, email) 
VALUES ('Sockwave', 'sander.mailservice@gmail.com');

INSERT INTO physis_role (id, name, description) 
VALUES (1, 'Admin', 'Administrator with all permissions');

INSERT INTO physis_permission (action, type, entity) 
VALUES ('all', 'all', 'all');

INSERT INTO physis_rolesToPermissions (permission_id,  role_id) 
VALUES (1, 1);

INSERT INTO physis_user (id, name, email, role_id) 
VALUES (1, 'Sander', 'sanderontwikkelt@gmail.com', 1);