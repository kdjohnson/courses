insert into courses(crn , waitlistpos , registrationstatus , registrationdescription , departmentcode , departmentdescription , coursetitle , coursedescription , termcode , subjectcode , subjectnumber, credit, section) values ('92033', '1', 'WL', 'Waitlist', 'ENG', 'English', 'Shakespeare Seminar', 'Analysis of four or five of the plays. Satisfies the university general education requirement for the capstone experience. Satisfies the university general education requirement for a writing intensive course in the major. Prerequisite for writing intensive: completion of the university writing foundation requirement. Prerequisite(s): ENG 211 and the three required 300-level British and American literary history courses; or permission of the instructor.', '201840', 'ENG', '4650', '4', '003');
insert into meeting(crn , startdate , enddate , starttime , endtime , coursetype , coursetypecode , buildingroom , campus , meetdays , starthour , startminutes , startmonth , startyear , startdayofmonth , startdayofweek , startweekofmonth , endhour , endminutes , endmonth , endyear , enddayofmonth , enddayofweek , endweekofmonth) values ('92033', '1451970000000', '1461643200000', '4:00PM', '7:47PM', 'In-Person Class Meeting', 'CLAS', 'OWD 200', 'Main Campus', 'Wednesday', '8', '0', '0', '2018', '5', '3', '2', '9', '47', '3', '2018', '26', '3', '5'); --insert into instructors(crn, firstname, lastname, office, email) values('17025', 'Marie', 'Curie', '002 FR', 'mariecurie@oakland.edu');
insert into instructors(crn, firstname, lastname, office, email) values('92033', 'Richard', 'Feynman', '003 CA', 'feynman@oakland.edu');

--
insert into grades(crn, credit, grade) values('92033', '4', '4.0');


--insert into terms(description, code, starttime, endtime, current) values('Winter Semester 2018', '201810', '1000000', '1000001', 'true') 
--insert into terms(description, code, starttime, endtime, current) values('Fall Semester 2018', '201840', '1000000', '1000001', 'false'); 
--insert into terms(description, code, starttime, endtime, current) values('Semester Semester 2018', '201830', '1000000', '1000001', 'false'); 
--insert into terms(description, code, starttime, endtime, current) values('Fall Semester 2017', '201740', '1000000', '1000001', 'false'); 
