USE la_marne_labels;

INSERT INTO status (name) VALUES ('actif'), ('inactif'), ('membre'), ('en attente'), ('en cours'), ('validé'), ('refusé'), ('pas de demarche en cours');

INSERT INTO roles (name) VALUES ('association'), ('entreprise');

INSERT INTO categories (name) VALUES ('alimentaire'), ('logement');

INSERT INTO addresses (number, type, street_name, complement, zip_code, city) VALUES (30 , 'rue', 'Sainte Catherine', 'étage 2', 51454, 'Reims');

INSERT INTO labels (name, logo, url, category_id) VALUES ('AOP', 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Protected-designation-origin-logo-fr.png', 'https://www.inao.gouv.fr/Les-signes-officiels-de-la-qualite-et-de-l-origine-SIQO/Appellation-d-origine-protegee-controlee-AOP-AOC', 1);

INSERT INTO steps (name, status_id, label_id) VALUES ('inscription', 6 , 1), ('renouvellement', 5, 1);

INSERT INTO admins (firstname, lastname, email, password, status_id) VALUES ('Cedric', 'Perot', 'cedric.perot@gmail.com', 'tototiti', 1), ('Roxanne', 'Lucas', 'lucas.roxanne@gmail.com', 'tatatutu', 2);

INSERT INTO users (company_name, firstname, lastname, siret, phone, email, password, website_url, address_id, role_id, status_id, step_id) VALUES ('la super boite', 'Elon', 'Musk', '12345678912345', 0666666666, 'elon.musk@tesla.com','password', 'www.tesla.com', 1, 2, 3, 1);


