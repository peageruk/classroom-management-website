use final;
INSERT INTO `final`.`zoom`(`name`,`link`,`meeting_id`,`pass_code`) 
VALUES('Zoom 1', 'https://us02web.zoom.us/j/89265216009?pwd=Mkxpa1VVUUpmT3psTlFyZWxKM2w4QT09', '89265216009', '2021'),('Zoom 2', 'https://us02web.zoom.us/j/81136162133?pwd=N0psR1VDVUFmOUtqYnF3bUNaWlJEQT09', '81136162133', '2021'),('Zoom 3', 'https://us02web.zoom.us/j/84969503241?pwd=WG1BbGFORUd5WTZ3WFp2YXlNUGFhdz09', '84969503241', '2021');
INSERT INTO `final`.`class_room` (`name`, `address`, `size`) 
VALUES('Paris ','19 Lê Thanh Nghị', '10'),('Singapore','19 Lê Thanh Nghị', '15'),('Big Data', 'Duy Tân','16'),('London','Mễ Trì Hạ','10');
INSERT INTO `final`.`account`(`username`, `date_of_birth`, `address`, `password`, `full_name`, `role`, `phone_number`, `email`, `facebook`) 
VALUES ('vanuoc', '1996-03-02', 'Hưng Yên', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Vũ Văn Ước', 'ADMIN','0377106297', 'vanuoc9xhy@gmail.com', 'https://www.facebook.com/uoc96/'),('thanh', '1997-09-12', 'Nam Định', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Lê Hồng Thanh', 'ADMIN', '0123456789', 'thanh01@gmail.com', 'https://www.facebook.com/thanh/'),('minh', '1995-09-12', 'Hà Nội', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyễn Anh Minh', 'STUDENT', '0123456788', 'minh@gmail.com', 'https://www.facebook.com/minh/'),('thao', '1999-09-12', 'Hải Dương', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Đỗ Lương Thảo', 'STUDENT', '0234356547', 'thao', 'https://www.facebook.com/thao/');
INSERT INTO `final`.`class` (`class_name`, `start_date`, `end_date`, `class_status`, `teaching_form`, `mentor_id`, `zoom_id`, `class_zoom_id`, `schedule`) 
VALUES ('Railway 59', '2022-09-12', '2023-03-12', 'IN_PROGRESS', 'ALL', '1', '1', '1', 'T3 - T5 - T7: 19.00-22.00 (VNT) tương đương 21.00 - 00h (JPT)'),
 ('Railway 60', '2022-09-12', '2023-03-12', 'IN_PROGRESS', 'ALL', '1', '2', '2', 'T3 - T5 - T7: 19.00-22.00 (VNT) tương đương 21.00 - 00h (JPT)'),
  ('Railway 61', '2022-09-12', '2023-03-12', 'PENDING', 'ONLINE', '1', '3', '3', 'T3 - T5 - T7: 19.00-22.00 (VNT) tương đương 21.00 - 00h (JPT)');
