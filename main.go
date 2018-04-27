package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"

	_ "github.com/lib/pq"
)

var db *sql.DB

const (
	//Term table creation.
	termSQL = "create table if not exists terms(id serial primary key, description text, code text, starttime text, endtime text, current text)"

	//Course table creation.
	courseSQL = "create table if not exists courses(id serial primary key, crn text, waitlistpos text, registrationstatus text, registrationdescription text, departmentcode text, departmentdescription text, coursetitle text, coursedescription text, termcode text, subjectcode text, subjectnumber text, credit text, section text)"

	//Meeting table creation.
	meetingSQL = "create table if not exists meetings(id serial primary key, crn text, startday text, startmonth text, startyear text, endday text, endmonth text, endyear text, starttime text, endtime text, coursetype text, coursetypecode text, buildingroom text, campus text, meetday text)"

	//Calendar meeting table creation
	meetingCalendarSQL = "create table if not exists calmeetins(id serial primary key, day text, month text, year text, starttime text, endtime text, coursetype text, buildingroom text, campus text, coursename text, coursetitle text, color text)"

	instructorSQL = "create table if not exists instructors(id serial primary key, crn text, firstname text, lastname text, office text, email text)"

	//Grade table creation.
	gradeSQL = "create table if not exists grades(id serial primary key, credit text, grade text, crn text)"

	//Overall credit and grade table creation.
	gpaSQL = "create table if not exists gpa(id serial primary key, level text, credits text, gpa text)"
)

// Configurations for the database
type config struct {
	URL      string
	Username string
	Password string
	Dbname   string
}

// Term represents the current time period that will be displayed (e.g Winter Semester 2018, Fall Semester 1989).
type Term struct {
	ID          int
	Description string `json:"description"`
	Code        string `json:"code"`
	Start       string `json:"start"`
	End         string `json:"end"`
	Current     string `json:"current"`
}

// Course represents the class that is assosciated with a given term (e.g Introduction to Golang).
type Course struct {
	ID                            int
	Crn                           string       `json:"crn"`
	WaitlistPos                   string       `json:"waitList"`
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

// lanStrings represents internationalization
type languageStrings struct {
	Section       string `json:"section"`
	CRN           string `json:"crn"`
	Credits       string `json:"credits"`
	CourseDetails string `json:"courseDetails"`
	CourseTitle   string `json:"courseTitle"`
	Department    string `json:"department"`
	Grade         string `json:"grade"`
	Description   string `json:"description"`
	Close         string `json:"close"`
	Courses       string `json:"courses"`
	Calendar      string `json:"calendar"`
	Grades        string `json:"grades"`
	Course        string `json:"course"`
	Level         string `json:"level"`
	GaC           string `json:"gac"`
	Waitlist      string `json:"waitlist"`
}

// Meeting represents the times and locations a course will gather (e.g. Monday at 1:47 PM).
type Meeting struct {
	ID             int
	Crn            string `json:"crn"`
	StartDay       string `json:"startDay"`
	StartMonth     string `json:"startMonth"`
	StartYear      string `json:"startYear"`
	EndDay         string `json:"endDay"`
	EndMonth       string `json:"endMonth"`
	EndYear        string `json:"endYear"`
	StartTime      string `json:"startTime"`
	EndTime        string `json:"endTime"`
	CourseType     string `json:"courseType"`
	CourseTypeCode string `json:"courseTypeCode"`
	BuildingRoom   string `json:"buildingRoom"`
	Campus         string `json:"campus"`
	MeetDays       string `json:"meetDays"`
}

//Instructor represents the person(s) who will teach a course.
type Instructor struct {
	ID        int
	Crn       string `json:"crn"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Office    string `json:"office"`
	Email     string `json:"email"`
}

// Grade represents the score the student received for a course.
type Grade struct {
	ID     int
	Credit string `json:"credit"`
	Grade  string `json:"grade"`
	Crn    string `json:"crn"`
}

//GPA represents the overall credits and grades a student has
type GPA struct {
	ID      int
	Level   string `json:"level"`
	Credits string `json:"credits"`
	GPA     string `json:"gpa"`
}

type MeetingCalendar struct {
	ID           int
	Day          string `json:"day"`
	Month        string `json:"month"`
	Year         string `json:"year"`
	StartTime    string `json:"starttime"`
	EndTime      string `json:"endtime"`
	BuildingRoom string `json:"buildingroom"`
	Campus       string `json:"campus"`
	CourseType   string `json:"coursetype"`
	CourseName   string `json:"coursename"`
	CourseTitle  string `json:"coursetitle"`
	Color        string `json:"color"`
}

type MeetingCalendarArray []MeetingCalendar

func calendarMeeting(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var meetings MeetingCalendarArray

	rows, err := db.Query("select * from calmeetins order by year, month, day, starttime")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var t MeetingCalendar
		if err := rows.Scan(&t.ID, &t.Day, &t.Month, &t.Year, &t.StartTime, &t.EndTime, &t.CourseType, &t.BuildingRoom, &t.Campus, &t.CourseName, &t.CourseTitle, &t.Color); err != nil {
			fmt.Println("error on coruses")
			panic(err)
		}
		meetings = append(meetings, t)
	}

	q := make(map[string]map[string]MeetingCalendarArray)

	for _, m := range meetings {
		qq, ok := q[m.Month]
		if !ok {
			qq = make(map[string]MeetingCalendarArray)
			q[m.Month] = qq
		}
		q[m.Month][m.Day] = append(q[m.Month][m.Day], m)
	}

	newMap := make(map[string]map[string]map[string]MeetingCalendarArray)

	newMap["events"] = q

	if err := json.NewEncoder(w).Encode(newMap); err != nil {
		panic(err)
	}

}

func lang(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	vars := mux.Vars(r)
	var data languageStrings
	switch vars["lng"] {
	case "ar":
		data =
			languageStrings{
				"الجزء",
				"CRN",
				"قروض",
				"تفاصيل الدورة",
				"عنوان الدورة",
				"قسم",
				"درجة",
				"وصف",
				"أغلق",
				"الدورات",
				"التقويم",
				"درجات",
				"دورة",
				"مستوى",
				"الدرجات والاعتمادات",
				"",
			}
	case "de":
		data = languageStrings{
			"Abschnitt",
			"CRN",
			"Gutschriften",
			"Kursdetails",
			"Kursname",
			"Abteilung",
			"Klasse",
			"Beshreibung",
			"Schließsen",
			"Kurse",
			"Kalender",
			"Noten",
			"Kurs",
			"Ebene",
			"Noten und Kredite",
			"Warteliste Position",
		}
	case "en":
		data = languageStrings{
			"Section",
			"CRN",
			"Credits",
			"Course Details",
			"Course Title",
			"Department",
			"Grade",
			"Description",
			"Close",
			"Courses",
			"Calendar",
			"Grades",
			"Course",
			"Level",
			"Grades and Credits",
			"Waitlist Position",
		}
	case "en-US":
		data = languageStrings{
			"Section",
			"CRN",
			"Credits",
			"Course Details",
			"Course Title",
			"Department",
			"Grade",
			"Description",
			"Close",
			"Courses",
			"Calendar",
			"Grades",
			"Course",
			"Level",
			"Grades and Credits",
			"Waitlist Position",
		}
	case "sp":
		data = languageStrings{
			"Sección",
			"CRN",
			"Créditos",
			"Detalles del courso",
			"Título del curso",
			"Departmento",
			"Grado",
			"Descripción",
			"Conclur",
			"Cursos",
			"Calendario",
			"Grados",
			"Curso",
			"Nivel",
			"Grados y Créditos",
			"Posición de lista de espera",
		}
	case "fr":
		data = languageStrings{
			"Section",
			"CRN",
			"Crédits",
			"Course Détails",
			"Titre de cours",
			"Départment",
			"Qualité",
			"La description",
			"Conclure",
			"Cours",
			"Calendrier",
			"Les notes",
			"Cour",
			"niveau",
			"Notes et crédits",
			"Position de la liste d'attente",
		}
	}

	if err := json.NewEncoder(w).Encode(data); err != nil {
		panic(err)
	}
}

func credits(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var credits []GPA
	data := GPA{2, "Undergraduate", "88", "3.2"}
	credits = append(credits, data)

	student := struct {
		GPA []GPA `json:"gpa"`
	}{
		credits,
	}

	if err := json.NewEncoder(w).Encode(student); err != nil {
		panic(err)
	}
}

func courses(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var courses []Course
	if r.Method == "GET" {
		if err := json.NewEncoder(w).Encode(courses); err != nil {
			panic(err)
		}
		return
	}

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
		if err := rows.Scan(&c.ID, &c.Crn, &c.WaitlistPos, &c.RegistrationStatus, &c.RegistrationStatusDescription, &c.DepartmentCode, &c.DepartmentDescription, &c.CourseTitle, &c.CourseDescription, &c.TermCode, &c.SubjectCode, &c.SubjectNumber, &c.Credit, &c.Section); err != nil {
			fmt.Println("error on coruses")
			panic(err)
		} else {
			instructorRows, err := db.Query("select * from instructors where crn = $1", c.Crn)
			if err != nil {
				fmt.Printf("Failed on instructors for crn %s\n", c.Crn)
				panic(err)
			}
			defer instructorRows.Close()

			for instructorRows.Next() {
				var i Instructor
				if err := instructorRows.Scan(&i.ID, &i.Crn, &i.FirstName, &i.LastName, &i.Office, &i.Email); err != nil {
					fmt.Println("error on instructors")
					panic(err)
				} else {
					c.Instructors = append(c.Instructors, i)
				}
			}

			meetingRows, err := db.Query("select * from meetings where crn = $1", c.Crn)
			if err != nil {
				fmt.Printf("Failed on meetings for crn %s\n", c.Crn)
				panic(err)
			}
			defer meetingRows.Close()

			for meetingRows.Next() {
				var m Meeting
				if err := meetingRows.Scan(&m.ID, &m.Crn, &m.StartDay, &m.StartMonth, &m.StartYear, &m.EndDay, &m.EndMonth, &m.EndYear, &m.StartTime, &m.EndTime, &m.CourseType, &m.CourseTypeCode, &m.BuildingRoom, &m.Campus, &m.MeetDays); err != nil {
					fmt.Println("error on meetings")
					panic(err)
				} else {
					c.Meetings = append(c.Meetings, m)
				}
			}

			var g Grade
			err = db.QueryRow("select * from grades where crn = $1", c.Crn).Scan(&g.ID, &g.Credit, &g.Grade, &g.Crn)
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
		if err := rows.Scan(&t.ID, &t.Description, &t.Code, &t.Start, &t.End, &t.Current); err != nil {
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

func advising(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	m := make(map[string]bool)

	m["status"] = false
	if err := json.NewEncoder(w).Encode(m); err != nil {
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
	dbURL := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", c.Username, c.Password, c.URL, c.Dbname)

	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(termSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(courseSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(meetingSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(instructorSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(gradeSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(gpaSQL)
	if err != nil {
		panic(err)
	}

	_, err = db.Query(meetingCalendarSQL)
	if err != nil {
		panic(err)
	}
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/locales/{lng}/{ns}", lang)
	r.HandleFunc("/api/courses", courses)
	r.HandleFunc("/api/terms", terms)
	r.HandleFunc("/api/credits", credits)
	r.HandleFunc("/api/calendar", calendarMeeting)
	r.HandleFunc("/api/advising", advising)
	http.Handle("/", r)
	http.ListenAndServe(":8082", nil)
}
