CREATE TABLE IF NOT EXISTS terms(
    id serial primary key,
    description text,
    code text,
    starttime text,
    endtime text,
    current text
);
CREATE TABLE IF NOT EXISTS courses(
    id serial primary key,
    crn text,
    waitlistpos text,
    registrationstatus text,
    registrationdescription text,
    departmentcode text,
    departmentdescription text,
    coursetitle text,
    coursedescription text,
    termcode text,
    subjectcode text,
    subjectnumber text,
    credit text,
    section text
);
CREATE TABLE IF NOT EXISTS meetings(
    id serial primary key,
    crn text,
    startday text,
    startmonth text,
    startyear text,
    endday text,
    endmonth text,
    endyear text,
    starttime text,
    endtime text,
    coursetype text,
    coursetypecode text,
    buildingroom text,
    campus text,
    meetday text
);
CREATE TABLE IF NOT EXISTS calmeetins(
    id serial primary key,
    day text,
    month text,
    year text,
    starttime text,
    endtime text,
    coursetype text,
    buildingroom text,
    campus text,
    coursename text,
    coursetitle text,
    color text
);
CREATE TABLE IF NOT EXISTS instructors(
    id serial primary key,
    crn text,
    firstname text,
    lastname text,
    office text,
    email text
);
CREATE TABLE IF NOT EXISTS grades(
    id serial primary key,
    credit text,
    grade text,
    crn text
);
CREATE TABLE IF NOT EXISTS gpa(
    id serial primary key,
    level text,
    credits text,
    gpa text
);
insert into terms(description, code, starttime, endtime, current)
values(
        'Winter Semester 2018',
        '201810',
        '1514782800000',
        '1527652800000',
        'false'
    );
insert into terms(description, code, starttime, endtime, current)
values(
        'Fall Semester 2017',
        '201740',
        '1504238400000',
        '1514696400000',
        'false'
    );
insert into terms(description, code, starttime, endtime, current)
values(
        'Summer Semester 2017',
        '201730',
        '1494216000000',
        '1503720000000',
        'true'
    );
insert into terms(description, code, starttime, endtime, current)
values(
        'Winter Semester 2017',
        '201710',
        '1483506000000',
        '1493179200000',
        'false'
    );
insert into terms(description, code, starttime, endtime, current)
values(
        'Fall Semester 2016',
        '201640',
        '1472702400000',
        '1481605200000',
        'false'
    );
insert into terms(description, code, starttime, endtime, current)
values(
        'Winter Semester 2016',
        '201610',
        '1451970000000',
        '1461643200000',
        'false'
    );
-- create course with meeting, instructor, grade for Summer 2018
insert into courses(
        crn,
        waitlistpos,
        registrationstatus,
        registrationdescription,
        departmentcode,
        departmentdescription,
        coursetitle,
        coursedescription,
        termcode,
        subjectcode,
        subjectnumber,
        credit,
        section
    )
values (
        '48926',
        '0',
        'RW',
        'Web Register',
        'SPN',
        'Department of Modern Languages and Literatures',
        'Intro Spanish Lang/Culture I',
        'A two-semester sequence in the fundamentals of Spanish and Hispanic cultures. A beginning course. SPN 114 must be taken first. SPN 114 or 115 satisfies the university general education requirement in the foreign language and culture knowledge exploration area.',
        '201730',
        'SPN',
        '114',
        '4',
        '005'
    );
insert into meetings(
        crn,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        starttime,
        endtime,
        coursetype,
        coursetypecode,
        buildingroom,
        campus,
        meetday
    )
values (
        '48926',
        '08',
        '5',
        '2017',
        '28',
        '6',
        '2017',
        '9:00 AM',
        '11:47 AM',
        'In-Person Class Meeting',
        'CLAS',
        'HH 489',
        'Main Campus',
        'Tuesday Thursday'
    );
insert into instructors(crn, firstname, lastname, office, email)
values(
        '48926',
        'Pablo',
        'Neruda',
        'CL 100',
        'vienteneruda@oakland.edu'
    );
insert into grades(crn, credit, grade)
values('48926', '4', '2.7');
-- create course with meeting, instructor, grade for Summer 2017
insert into courses(
        crn,
        waitlistpos,
        registrationstatus,
        registrationdescription,
        departmentcode,
        departmentdescription,
        coursetitle,
        coursedescription,
        termcode,
        subjectcode,
        subjectnumber,
        credit,
        section
    )
values (
        '16024',
        '0',
        'RW',
        'Web Register',
        'FRH',
        'French',
        'Second Year French II',
        'Two-semester sequence continuing the work of (FRH 114 or FRH 1140)-(FRH 115 or FRH 1150)with the addition of cultural and literary readings. (FRH 214 or FRH 2140) must be taken first. (Formerly FRH 215). (FRH 214 or FRH 2140) or (FRH 215 or FRH 2150) satisfies the university general education requirement in the foreign language and culture knowledge exploration area or the knowledge application integration area, not both. Prerequisite for knowledge application integration: completion of the university general education requirement in the foreign language and culture knowledge exploration area. Prerequisite(s): One year of college French or equivalent.',
        '201730',
        'FRH',
        '215',
        '4',
        '002'
    );
insert into meetings(
        crn,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        starttime,
        endtime,
        coursetype,
        coursetypecode,
        buildingroom,
        campus,
        meetday
    )
values (
        '16024',
        '08',
        '5',
        '2017',
        '28',
        '6',
        '2017',
        '12:00 PM',
        '2:47 PM',
        'In-Person Class Meeting',
        'CLAS',
        'SFH 215',
        'Main Campus',
        'Monday Wednesday'
    );
insert into instructors(crn, firstname, lastname, office, email)
values(
        '16024',
        'Jacques',
        'Cousteau',
        'SEA 001',
        'cousteau@oakland.edu'
    );
insert into grades(crn, credit, grade)
values('16024', '4', '4.0');
-- create course with meeting, instructor, grade
-- create course with meeting, instructor, grade for Summer 2017
insert into courses(
        crn,
        waitlistpos,
        registrationstatus,
        registrationdescription,
        departmentcode,
        departmentdescription,
        coursetitle,
        coursedescription,
        termcode,
        subjectcode,
        subjectnumber,
        credit,
        section
    )
values (
        '17025',
        '0',
        'RW',
        'Web Register',
        'PHY',
        'Physics',
        'Foundation of Modern Physics',
        'Introduction to relativity, kinetic theory, quantization and atomic physics. Additional topics chosen from physics of molecules, solids, nuclei and elementary particles. Prerequisites: PHY 102 or PHY 152 and MTH 155 recommended; concurrent enrollment in PHY 317.',
        '201730',
        'PHY',
        '371',
        '4',
        '001'
    );
insert into meetings(
        crn,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        starttime,
        endtime,
        coursetype,
        coursetypecode,
        buildingroom,
        campus,
        meetday
    )
values (
        '17025',
        '08',
        '5',
        '2017',
        '28',
        '6',
        '2017',
        '3:00 PM',
        '4:47 PM',
        'In-Person Class Meeting',
        'CLAS',
        'MSC 200',
        'Main Campus',
        'Monday'
    );
insert into instructors(crn, firstname, lastname, office, email)
values(
        '17025',
        'Marie',
        'Curie',
        'FRH 012',
        'curie@oakland.edu'
    );
insert into instructors(crn, firstname, lastname, office, email)
values(
        '17025',
        'Richard',
        'Feynman',
        'CA 201',
        'feynman@oakland.edu'
    );
insert into grades(crn, credit, grade)
values('17025', '4', '3.5');
-- create course with meeting, instructor, grade for Winter 2017
insert into courses(
        crn,
        waitlistpos,
        registrationstatus,
        registrationdescription,
        departmentcode,
        departmentdescription,
        coursetitle,
        coursedescription,
        termcode,
        subjectcode,
        subjectnumber,
        credit,
        section
    )
values (
        '92033',
        '1',
        'WL',
        'Waitlist',
        'ENG',
        'English',
        'Shakespeare Seminar',
        'Analysis of four or five of the plays. Satisfies the university general education requirement for the capstone experience. Satisfies the university general education requirement for a writing intensive course in the major. Prerequisite for writing intensive: completion of the university writing foundation requirement. Prerequisite(s): ENG 211 and the three required 300-level British and American literary history courses; or permission of the instructor.',
        '201710',
        'ENG',
        '4650',
        '4',
        '003'
    );
insert into meetings(
        crn,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        starttime,
        endtime,
        coursetype,
        coursetypecode,
        buildingroom,
        campus,
        meetday
    )
values (
        '92033',
        '06',
        '1',
        '2016',
        '26',
        '4',
        '2016',
        '1:00 PM',
        '2:47 PM',
        'In-Person Class Meeting',
        'CLAS',
        'ODH 402',
        'Main Campus',
        'Friday'
    );
insert into instructors(crn, firstname, lastname, office, email)
values(
        '92033',
        'Ian',
        'McEwan',
        'GSG 003 ',
        'mcewan23@oakland.edu'
    );
insert into grades(crn, credit, grade)
values('92033', '4', '3.8');
-- create course with meeting, instructor, grade for Fall 2016
insert into courses(
        crn,
        waitlistpos,
        registrationstatus,
        registrationdescription,
        departmentcode,
        departmentdescription,
        coursetitle,
        coursedescription,
        termcode,
        subjectcode,
        subjectnumber,
        credit,
        section
    )
values (
        '15037',
        '0',
        'RW',
        'Web Register',
        'BIO',
        'Biological Sciences',
        'Human Anatomy',
        'The integration of organs into systems and systems into the organism. Selected aspects of developmental, comparative and microanatomy also will be discussed. Relevant to students in health sciences, biological science and liberal arts studies. Offered fall and winter semesters. Prerequisite: BIO 111.',
        '201640',
        'BIO',
        '205',
        '4',
        '002'
    );
insert into meetings(
        crn,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        starttime,
        endtime,
        coursetype,
        coursetypecode,
        buildingroom,
        campus,
        meetday
    )
values (
        '15037',
        '01',
        '9',
        '2016',
        '31',
        '12',
        '2016',
        '1:00 PM',
        '2:47 PM',
        'In-Person Class Meeting',
        'CLAS',
        'ODH 402',
        'Main Campus',
        'Friday'
    );
insert into instructors(crn, firstname, lastname, office, email)
values(
        '15037',
        'Terry',
        'Jerry',
        'HS 689',
        'jerryterry@oakland.edu'
    );
insert into grades(crn, credit, grade)
values('15037', '4', '3.0');
-- create course with meeting, instructor, grade for Fall 2016
insert into courses(
        crn,
        waitlistpos,
        registrationstatus,
        registrationdescription,
        departmentcode,
        departmentdescription,
        coursetitle,
        coursedescription,
        termcode,
        subjectcode,
        subjectnumber,
        credit,
        section
    )
values (
        '44864',
        '0',
        'RW',
        'Web Register',
        'SOC',
        'Sociology',
        'Intro to Sociology',
        'Introduction to the basic concepts of sociology relating to the study of people as participants in group life. Particular attention is given to culture, socialization and self development, social class, and major social institutions. Satisfies the university general education requirement in the social science knowledge exploration area. Satisfies the university general education requirement in U.S. diversity.',
        '201640',
        'SOC',
        '100',
        '4',
        '003'
    );
insert into meetings(
        crn,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        starttime,
        endtime,
        coursetype,
        coursetypecode,
        buildingroom,
        campus,
        meetday
    )
values (
        '44864',
        '01',
        '9',
        '2016',
        '31',
        '12',
        '2016',
        '3:00 PM',
        '4:47 PM',
        'In-Person Class Meeting',
        'CLAS',
        'HH 201',
        'Main Campus',
        'Wednesday'
    );
insert into instructors(crn, firstname, lastname, office, email)
values(
        '44864',
        'Daniel',
        'Kahneman',
        'SOC 202',
        'dannykahneman@oakland.edu'
    );
insert into instructors(crn, firstname, lastname, office, email)
values(
        '44864',
        'Amos',
        'Tversky',
        'SOC 203',
        'tversky@oakland.edu'
    );
insert into grades(crn, credit, grade)
values('44864', '3', '3.4');
-- create course with meeting, instructor, grade for Fall 2016
insert into courses(
        crn,
        waitlistpos,
        registrationstatus,
        registrationdescription,
        departmentcode,
        departmentdescription,
        coursetitle,
        coursedescription,
        termcode,
        subjectcode,
        subjectnumber,
        credit,
        section
    )
values (
        '10057',
        '0',
        'RW',
        'Web Register',
        'CHM',
        'Chemistry',
        'General Chemistry I',
        'Integrated lecture-laboratory. States of matter, atomic structure, bonding and molecular structure, chemical reactions. Recommended preparation is three years of high school mathematics and one year of high school chemistry. CHM 157 satisfies the university general education requirement in the natural science and technology knowledge exploration area. Prerequisite: Score of 20 or higher on ACT mathematics exam; or MTH 062.',
        '201640',
        'CHM',
        '157',
        '4',
        '002'
    );
insert into meetings(
        crn,
        startday,
        startmonth,
        startyear,
        endday,
        endmonth,
        endyear,
        starttime,
        endtime,
        coursetype,
        coursetypecode,
        buildingroom,
        campus,
        meetday
    )
values (
        '10057',
        '01',
        '9',
        '2016',
        '31',
        '12',
        '2016',
        '3:00 PM',
        '4:47 PM',
        'In-Person Class Meeting',
        'CLAS',
        'MSC 302',
        'Main Campus',
        'Friday'
    );
insert into instructors(crn, firstname, lastname, office, email)
values(
        '10057',
        'Marie',
        'Curie',
        'FRH 012',
        'curie@oakland.edu'
    );
insert into grades(crn, credit, grade)
values('10057', '3', '2.0');
-- create calendar meetings for summer 2017
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        3,
        5,
        2017,
        '15:00pm',
        '18:00pm',
        'lecture',
        'DH 202',
        'main campus',
        'Sophomore Project',
        'CSE 280',
        '#00796B'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        13,
        5,
        2017,
        '12:00pm',
        '14:00pm',
        'lecture',
        'DH 202',
        'main campus',
        'Sophomore Project',
        'CSE 280',
        '#00796B'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        14,
        5,
        2017,
        '9:20am',
        '10:27:00am',
        'lecture',
        'HHB 2086',
        'main campus',
        'Literature',
        'HC 2020',
        '#D81B60'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        14,
        5,
        2017,
        '1:20pm',
        '2:27:00pm',
        'lecture',
        'SFH 167',
        'main campus',
        'Second Year French II',
        'FRH 2150',
        '#00838F'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        14,
        5,
        2017,
        '5:30pm',
        '7:17:00pm',
        'lecture',
        'SFH 165',
        'main campus',
        'Linear Algebra',
        'MTH 2775',
        '#8E24AA'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        15,
        5,
        2017,
        '1:00pm',
        '2:47pm',
        'lecture',
        'EC 554',
        'main campus',
        'Intro to Computer Networks',
        'CSI 2470',
        '#0277BD'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        16,
        5,
        2017,
        '9:20am',
        '10:27am',
        'lecture',
        'HHB 2086',
        'main campus',
        'Literature',
        'HC 2020',
        '#D81B60'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        16,
        5,
        2017,
        '1:20pm',
        '2:27pm',
        'lecture',
        'SFH 167',
        'main campus',
        'Second Year French II',
        'FRH 2150',
        '#00838F'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        19,
        5,
        2017,
        '9:20am',
        '10:27am',
        'lecture',
        'HHB 2086',
        'main campus',
        'Literature',
        'HC 2020',
        '#D81B60'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        19,
        5,
        2017,
        '1:20pm',
        '2:27pm',
        'lecture',
        'SFH 167',
        'main campus',
        'Second Year French II',
        'FRH 2150',
        '#00838F'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        19,
        5,
        2017,
        '5:30pm',
        '7:17pm',
        'lecture',
        'SFH 165',
        'main campus',
        'Linear Algebra',
        'MTH 2775',
        '#8E24AA'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        20,
        5,
        2017,
        '1:00pm',
        '2:47pm',
        'lecture',
        'EC 554',
        'main campus',
        'Intro to Computer Networks',
        'CSI 2470',
        '#0277BD'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        21,
        5,
        2017,
        '9:20am',
        '10:27am',
        'lecture',
        'HHB 2086',
        'main campus',
        'Literature',
        'HC 2020',
        '#D81B60'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        21,
        5,
        2017,
        '1:20pm',
        '2:27pm',
        'lecture',
        'SFH 167',
        'main campus',
        'Second Year French II',
        'FRH 2150',
        '#00838F'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        21,
        5,
        2017,
        '5:30pm',
        '7:17pm',
        'lecture',
        'SFH 165',
        'main campus',
        'Linear Algebra',
        'MTH 2775',
        '#8E24AA'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        22,
        5,
        2017,
        '1:00pm',
        '2:47pm',
        'lecture',
        'EC 554',
        'main campus',
        'Intro to Computer Networks',
        'CSI 2470',
        '#0277BD'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        23,
        5,
        2017,
        '9:20am',
        '10:27am',
        'lecture',
        'HHB 2086',
        'main campus',
        'Literature',
        'HC 2020',
        '#D81B60'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        23,
        5,
        2017,
        '1:20pm',
        '2:27pm',
        'lecture',
        'SFH 167',
        'main campus',
        'Second Year French II',
        'FRH 2150',
        '#00838F'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        26,
        5,
        2017,
        '9:20am',
        '10:27am',
        'lecture',
        'HHB 2086',
        'main campus',
        'Literature',
        'HC 2020',
        '#D81B60'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        26,
        5,
        2017,
        '1:20pm',
        '2:27pm',
        'lecture',
        'SFH 167',
        'main campus',
        'Second Year French II',
        'FRH 2150',
        '#00838F'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        26,
        5,
        2017,
        '5:30pm',
        '7:17pm',
        'lecture',
        'SFH 165',
        'main campus',
        'Linear Algebra',
        'MTH 2775',
        '#8E24AA'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        27,
        5,
        2017,
        '1:00pm',
        '2:47pm',
        'lecture',
        'EC 554',
        'main campus',
        'Intro to Computer Networks',
        'CSI 2470',
        '#D81B60'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        28,
        5,
        2017,
        '9:20am',
        '10:27am',
        'lecture',
        'HHB 2086',
        'main campus',
        'Literature',
        'HC 2020',
        '#D81B60'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        28,
        5,
        2017,
        '1:20pm',
        '2:27pm',
        'lecture',
        'SFH 167',
        'main campus',
        'Second Year French II',
        'FRH 2150',
        '#0277BD'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        28,
        5,
        2017,
        '5:30pm',
        '7:17pm',
        'lecture',
        'SFH 165',
        'main campus',
        'Linear Algebra',
        'MTH 2775',
        '#8E24AA'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        29,
        5,
        2017,
        '1:00pm',
        '2:47pm',
        'lecture',
        'EC 554',
        'main campus',
        'Intro to Computer Networks',
        'CSI 2470',
        '#0277BD'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        30,
        5,
        2017,
        '9:20am',
        '10:27am',
        'lecture',
        'HHB 2086',
        'main campus',
        'Literature',
        'HC 2020',
        '#D81B60'
    );
insert into calmeetins (
        day,
        month,
        year,
        starttime,
        endtime,
        coursetype,
        buildingroom,
        campus,
        coursename,
        coursetitle,
        color
    )
values (
        30,
        5,
        2017,
        '1:20pm',
        '2:27pm',
        'lecture',
        'SFH 167',
        'main campus',
        'Second Year French II',
        'FRH 2150',
        '#00838F'
    );

INSERT INTO gpa (level, credits, gpa)
VALUES ('Undergraduate', 160, 3.56);