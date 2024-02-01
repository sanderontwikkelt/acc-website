INSERT INTO physis_settings (name, email) 
VALUES ('Sockwave', 'sander.mailservice@gmail.com');

INSERT INTO physis_role (id, name, description) 
VALUES (1, 'Admin', 'Administrator with all permissions');

INSERT INTO physis_permission (action, type, entity, role_id) 
VALUES ('all', 'all', 'all', 1);

INSERT INTO physis_usersToRoles (user_id,  role_id) 
VALUES ('c9c5f3c9-728c-4be4-b0a2-c5438a15d227', 1);

INSERT INTO physis_rolesToPermissions (permission_id,  role_id) 
VALUES (1, 1);