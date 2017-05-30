package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

const (
	TERM_SQL       = "create table if not exists terms(id serial primary key, description text, code text, starttime text, endtime text, current text)"
	COURSE_SQL     = "create table if not exists courses(id serial primary key, crn text, waitlistpos text, registrationstatus text, registrationdescription text, departmentcode text, departmentdescription text, coursetitle text, coursedescription text, termcode text, subjectcode text, subjectnumber text, credit text)"
	MEETING_SQL    = "create table if not exists meeting(id serial primary key, crn text, startdate text, enddate text, starttime text, endtime text, coursetype text, coursetypecode text, buildingroom text, campus text, meetdays text, starthour text, startminutes text, startmonth text, startyear text, startdayofmonth text, startdayofweek text, startweekofmonth text, endhour text, endminutes text, endmonth text, endyear text, enddayofmonth text, enddayofweek text, endweekofmonth text)"
	INSTRUCTOR_SQL = "create table if not exists instructors(id serial primary key, crn text, firstname text, lastname text, office text, email text)"
	GRADE_SQL      = "create table if not exists grades(id serial primary key, credit text, grade text, crn text)"
)

type config struct {
	Url      string
	Username string
	Password string
	Dbname   string
}

type Term struct {
	Id          int
	Description string `json:"description"`
	Code        string `json:"code"`
	Start       string `json:"start"`
	End         string `json:"end"`
	Current     string `json:"current"`
}

type Course struct {
	Id                            int
	Crn                           string       `json:"crn"`
	WaitlistPos                   string       `json:"waitlistPost"`
	RegistrationStatus            string       `json:"registrationStatus"`
	RegistrationStatusDescription string       `json:"registrationStatusDescription"`
	DepartmentCode                string       `json:"departmentCode"`
	DepartmentDescription         string       `json:"departmentDescription"`
	CourseTitle                   string       `json:"courseTitle"`
	CourseDescription             string       `json:"courseDescription"`
	TermCode                      string       `json:"termCode"`
	SubjectCode                   string       `json:"subjectCode"`
	SubjectNumber                 string       `json:"subjectNumber"`
	Section                       string       `json:"section"`
	Credit                        string       `json:"credit"`
	Meetings                      []Meeting    `json:"meetings"`
	Instructors                   []Instructor `json:"instructors"`
	Grade                         Grade        `json:"grade"`
}

type Meeting struct {
	Id               int
	Crn              string `json:"crn"`
	StartDate        string `json:"startDate"`
	EndDate          string `json:"endDate"`
	StartTime        string `json:"startTime"`
	EndTime          string `json:"endTime"`
	CourseType       string `json:"courseType"`
	CourseTypeCode   string `json:"courseTypeCode"`
	BuildingRoom     string `json:"buildingRoom"`
	Campus           string `json:"campus"`
	MeetDays         string `json:"meetDays"`
	StartHour        string `json:"startHour"`
	StartMinutes     string `json:"startMinutes"`
	StartMonth       string `json:"startMonth"`
	StartYear        string `json:"startYear"`
	StartDayOfMonth  string `json:"startDayOfMonth"`
	StartDayOfWeek   string `json:"startDayOfWeek"`
	StartWeekOfMonth string `json:"startWeekOfMonth"`
	EndHour          string `json:"endHour"`
	EndMinutes       string `json:"endMinutes"`
	EndMonth         string `json:"endMonth"`
	EndYear          string `json:"endYear"`
	EndDayOfMonth    string `json:"endDayOfMonth"`
	EndDayOfWeek     string `json:"endDayOfWeek"`
	EndWeekOfMonth   string `json:"endWeekOfMonth"`
}

type Instructor struct {
	Id        int
	Crn       string `json:"crn"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Office    string `json:"office"`
	Email     string `json:"email"`
}

type Grade struct {
	Id     int
	Credit string `json:"credit"`
	Grade  string `json:"grade"`
	Crn    string `json:"crn"`
}

type Student struct {
	ClassStanding        string `json:"classStanding"`
	Major1               string `json:"major1"`
	DegreeType           string `json:"degreeType"`
	College              string `json:"college"`
	Level                string `json:"level"`
	Major1concentration1 string `json:"major1concentration1"`
	Major1concentration2 string `json:"major1concentration2"`
	Major1concentration3 string `json:"major1concentration3"`
	Major2               string `json:"major2"`
	Major2Department     string `json:"major2Department"`
	Major2concentration1 string `json:"major2concentration1"`
	Major2concentration2 string `json:"major2concentration2"`
	Major2concentration3 string `json:"major2concentration3"`
	Minor1               string `json:"minor1"`
	Minor2               string `json:"minor2"`
}

type Person struct {
	Address       string `json:"address"`
	Email         string `json:"email"`
	Gid           string `json:"gid"`
	LegalName     string `json:"legalName"`
	PhoneNumber   string `json:"phoneNumber"`
	Pidm          string `json:"pidm"`
	PrefFirstName string `json:"prefFirstName"`
}

func person(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	data := Person{
		"318 Meadow Brook Rd, Rochester, MI 48309",
		"grizz@oakland.edu",
		"G00000000",
		"Grizz OU",
		"(248) 370-2100",
		"111111",
		"Grizz",
	}

	person := struct {
		Person Person `json:"person"`
	}{
		data,
	}

	if err := json.NewEncoder(w).Encode(person); err != nil {
		panic(err)
	}
}

func mydetails(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var students []Student
	data := Student{"Senior", "computer science", "Bach of Sci", "School CS", "Undergrad", "", "", "", "", "", "", "", "", "", ""}
	students = append(students, data)

	student := struct {
		Student []Student `json:"studentDetails"`
	}{
		students,
	}

	if err := json.NewEncoder(w).Encode(student); err != nil {
		panic(err)
	}
}

func courses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var courses []Course

	s := struct {
		Term string `json:"code"`
	}{}

	if err := json.NewDecoder(r.Body).Decode(&s); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	termCode := s.Term

	rows, err := db.Query("select * from courses where termcode = $1", termCode)
	if err != nil {
		fmt.Printf("Failed on courses for termcode %s\n", termCode)
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var c Course
		if err := rows.Scan(&c.Id, &c.Crn, &c.WaitlistPos, &c.RegistrationStatus, &c.RegistrationStatusDescription, &c.DepartmentCode, &c.DepartmentDescription, &c.CourseTitle, &c.CourseDescription, &c.TermCode, &c.SubjectCode, &c.SubjectNumber, &c.Credit, &c.Section); err != nil {
			fmt.Println("error on coruses")
			panic(err)
		} else {
			instructor_rows, err := db.Query("select * from instructors where crn = $1", c.Crn)
			if err != nil {
				fmt.Printf("Failed on instructors for crn %s\n", c.Crn)
				panic(err)
			}
			defer instructor_rows.Close()

			for instructor_rows.Next() {
				var i Instructor
				if err := instructor_rows.Scan(&i.Id, &i.Crn, &i.FirstName, &i.LastName, &i.Office, &i.Email); err != nil {
					fmt.Println("error on instructors")
					panic(err)
				} else {
					c.Instructors = append(c.Instructors, i)
				}
			}

			meeting_rows, err := db.Query("select * from meeting where crn = $1", c.Crn)
			if err != nil {
				fmt.Printf("Failed on meetings for crn %s\n", c.Crn)
				panic(err)
			}
			defer meeting_rows.Close()

			for meeting_rows.Next() {
				var m Meeting
				if err := meeting_rows.Scan(&m.Id, &m.Crn, &m.StartDate, &m.EndDate, &m.StartTime, &m.EndTime, &m.CourseType, &m.CourseTypeCode, &m.BuildingRoom, &m.Campus, &m.MeetDays, &m.StartHour, &m.StartMinutes, &m.StartMonth, &m.StartYear, &m.StartDayOfMonth, &m.StartDayOfWeek, &m.StartWeekOfMonth, &m.EndHour, &m.EndMinutes, &m.EndMonth, &m.EndYear, &m.EndDayOfMonth, &m.EndDayOfWeek, &m.EndWeekOfMonth); err != nil {
					fmt.Println("error on meetings")
					panic(err)
				} else {
					c.Meetings = append(c.Meetings, m)
				}
			}

			var g Grade
			err = db.QueryRow("select * from grades where crn = $1", c.Crn).Scan(&g.Id, &g.Credit, &g.Grade, &g.Crn)
			if err != nil {
				fmt.Printf("Failed on grades for crn %s\n", c.Crn)
				panic(err)
			}

			c.Grade = g
			courses = append(courses, c)
		}
	}

	course := struct {
		Course []Course `json:"courses"`
	}{
		courses,
	}

	if err := json.NewEncoder(w).Encode(course); err != nil {
		panic(err)
	}
}

func terms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var terms []Term
	rows, err := db.Query("select * from terms")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var t Term
		if err := rows.Scan(&t.Id, &t.Description, &t.Code, &t.Start, &t.End, &t.Current); err != nil {
			fmt.Println("error on coruses")
			panic(err)
		}
		terms = append(terms, t)

	}

	term := struct {
		Term []Term `json:"terms"`
	}{
		terms,
	}

	if err := json.NewEncoder(w).Encode(term); err != nil {
		panic(err)
	}
}

func init() {
	var c config
	file, err := os.Open("database.json")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&c)
	if err != nil {
		panic(err)
	}

	fmt.Println(c)
	dbURL := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", c.Username, c.Password, c.Url, c.Dbname)

	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(TERM_SQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(COURSE_SQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(MEETING_SQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(INSTRUCTOR_SQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(GRADE_SQL)
	if err != nil {
		panic(err)
	}
}

func main() {
	http.HandleFunc("/api/person", person)
	http.HandleFunc("/api/mydetails", mydetails)
	http.HandleFunc("/api/courses", courses)
	http.HandleFunc("/api/terms", terms)
	http.ListenAndServe(":8082", nil)
}
