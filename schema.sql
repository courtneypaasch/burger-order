DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;
USE burger_db;


CREATE TABLE burgerList (
  id int AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY(id)
);

select * from burgerList