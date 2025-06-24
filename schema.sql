DROP DATABASE IF EXISTS koreantutor;

CREATE DATABASE koreantutor;

USE koreantutor;

CREATE TABLE phrases (
  id int NOT NULL AUTO_INCREMENT,
  kor varchar(255) CHARACTER SET utf8,
  eng varchar(255) ,
  rom varchar(255) ,
  next_review_date DATETIME,
  status ENUM('Not yet', 'Almost', 'Got it') NOT NULL,
  PRIMARY KEY (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u <USER> -p < schema.sql
 *  For example, on a pairing station, it'll be 
 *    mysql -u student -p < schema.sql
 *  and then you'll have to enter the password, student
 *  On your personal computer, if you haven't set up
 *  a password, it'll be 
 *    mysql -u root < schema.sql
 *
 *  If you need assistance with this step,
 *  please talk to a proctor.
*/

INSERT into phrases (kor, rom, eng) VALUES ("안녕하새요", "an-nyeong ha-se-yo", "Hello");
INSERT into phrases (kor, rom, eng) VALUES ("감사합니다", "gam-sa-hab-ni-da", "Thank you");
INSERT into phrases (kor, rom, eng) VALUES ("잠시만요", "jam-si-man-yo", "Wait a moment/Excuse me");
INSERT into phrases (kor, rom, eng) VALUES ("미안해요", "mi-an-he-yo", "I'm sorry.");
INSERT into phrases (kor, rom, eng) VALUES ("이거 얼마예요?", "i-geo eol-ma-ye-yo", "How much does this cost?");
INSERT into phrases (kor, rom, eng) VALUES ("공핳 가주새요", "gong-hang ga-ju-se-yo", "Please take me to the airport.");
INSERT into phrases (kor, rom, eng) VALUES ("잘 먹겠습니다", "jal meok-ge-sseum-ni-da", "I will eat well!");
INSERT into phrases (kor, rom, eng) VALUES ("김밥 주세요", "gim-bap ju-se-yo", "Please give me Kimbap.");
INSERT into phrases (kor, rom, eng) VALUES ("맛있어요", "ma-si-sseo-yo", "It's delicious!");
INSERT into phrases (kor, rom, eng) VALUES ("헤크리엑터 대박이예요!", "Cohort 19 dae-bak-i-ye-yo", "Cohort 19 is amazing!");
