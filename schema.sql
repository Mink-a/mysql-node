CREATE DATABASE note_app;
-- @block
USE note_app;
-- @block
CREATE TABLE NOTES (
  ID INTEGER PRIMARY KEY AUTO_INCREMENT,
  TITLE VARCHAR(255) NOT NULL,
  CONTENTS TEXT NOT NULL,
  CREATED TIMESTAMP NOT NULL DEFAULT NOW()
);
-- @block 
INSERT INTO NOTES (TITLE, CONTENTS)
VALUES ("FIRST NOTE", "FIRST OF ALL"),
  ("SECOND NOTE", "IN THE SECOND");