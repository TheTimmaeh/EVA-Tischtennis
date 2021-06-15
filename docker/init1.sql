-- create the databases
CREATE DATABASE IF NOT EXISTS eva-tischtennis;

-- create the users for each database
CREATE USER 'knex'@'%' IDENTIFIED BY 'eva-tischtennis';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `eva-tischtennis`.* TO 'knex'@'%';

FLUSH PRIVILEGES;



