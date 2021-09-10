package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
)

var db *sql.DB

type Term struct {
	ID          int
	Description string `json:"description"`
	Code        int    `json:"code"`
	Start       string `json:"start"`
	End         string `json:"end"`
	Current     bool   `json:"current"`
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
	Level   string `json:"standing"`
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

type ErrorResponse struct {
	Message string `json:"message"`
}

type MeetingCalendarArray []MeetingCalendar

func terms(c echo.Context) error {
	var terms []Term
	rows, err := db.Query("select * from terms")

	if err != nil {
		return c.JSON(500, ErrorResponse{"Failed to get terms"})
	}

	defer rows.Close()

	for rows.Next() {
		var t Term
		if err := rows.Scan(&t.ID, &t.Description, &t.Code, &t.Start, &t.End, &t.Current); err != nil {
			fmt.Println("error on terms")
			return c.JSON(500, ErrorResponse{"Failed to get terms"})
		}
		terms = append(terms, t)

	}

	term := struct {
		Term []Term `json:"terms"`
	}{
		terms,
	}

	return c.JSON(200, term)
}

func courses(c echo.Context) error {
	termCode, err := strconv.Atoi(c.Param("term"))
	if err != nil {
		fmt.Println(err)
	}

	var terms []Term
	termRows, err := db.Query("select * from terms")

	if err != nil {
		return c.JSON(500, ErrorResponse{"Failed to get terms"})
	}

	defer termRows.Close()

	for termRows.Next() {
		var t Term
		if err := termRows.Scan(&t.ID, &t.Description, &t.Code, &t.Start, &t.End, &t.Current); err != nil {
			fmt.Println("error on terms")
			return c.JSON(500, ErrorResponse{"Failed to get terms"})
		}
		terms = append(terms, t)

	}

	var courses = []Course{}

	if termCode == 0 {
		for _, term := range terms {
			if term.Current {
				termCode = term.Code
			}
		}
	}

	courseRows, err := db.Query("SELECT * from courses WHERE termcode = $1", termCode)
	if err != nil {
		var msg = fmt.Sprintf("Failed on courses for termcode %d\n", termCode)
		return c.JSON(500, ErrorResponse{msg})
	}
	defer courseRows.Close()

	for courseRows.Next() {
		var cr Course
		if err := courseRows.Scan(&cr.ID, &cr.Crn, &cr.WaitlistPos, &cr.RegistrationStatus, &cr.RegistrationStatusDescription, &cr.DepartmentCode, &cr.DepartmentDescription, &cr.CourseTitle, &cr.CourseDescription, &cr.TermCode, &cr.SubjectCode, &cr.SubjectNumber, &cr.Credit, &cr.Section); err != nil {
			fmt.Println("error on coruses")
			panic(err)
		} else {
			fmt.Println(cr)
			instructorRows, err := db.Query("select * from instructors where crn = $1", cr.Crn)
			if err != nil {
				var msg = fmt.Sprintf("Failed on instructors for crn %s\n", cr.Crn)
				return c.JSON(500, ErrorResponse{msg})
			}
			defer instructorRows.Close()

			for instructorRows.Next() {
				var i Instructor
				if err := instructorRows.Scan(&i.ID, &i.Crn, &i.FirstName, &i.LastName, &i.Office, &i.Email); err != nil {
					var msg = fmt.Sprintln("error on instructors")
					return c.JSON(500, ErrorResponse{msg})
				} else {
					cr.Instructors = append(cr.Instructors, i)
				}
			}

			meetingRows, err := db.Query("select * from meetings where crn = $1", cr.Crn)
			if err != nil {
				var msg = fmt.Sprintf("Failed on meetings for crn %s\n", cr.Crn)
				return c.JSON(500, ErrorResponse{msg})
			}
			defer meetingRows.Close()

			for meetingRows.Next() {
				var m Meeting
				if err := meetingRows.Scan(&m.ID, &m.Crn, &m.StartDay, &m.StartMonth, &m.StartYear, &m.EndDay, &m.EndMonth, &m.EndYear, &m.StartTime, &m.EndTime, &m.CourseType, &m.CourseTypeCode, &m.BuildingRoom, &m.Campus, &m.MeetDays); err != nil {
					var msg = fmt.Sprintln("error on meetings")
					return c.JSON(500, ErrorResponse{msg})
				} else {
					cr.Meetings = append(cr.Meetings, m)
				}
			}

			var g Grade
			err = db.QueryRow("select * from grades where crn = $1", cr.Crn).Scan(&g.ID, &g.Credit, &g.Grade, &g.Crn)
			if err != nil {
				var msg = fmt.Sprintf("Failed on grades for crn %s\n", cr.Crn)
				return c.JSON(500, ErrorResponse{msg})
			}

			cr.Grade = g
			courses = append(courses, cr)
		}

	}

	var gpas = []GPA{}
	gpasRows, gpasErr := db.Query("select level, credits, gpa from gpa")
	if gpasErr != nil {
		return c.JSON(500, ErrorResponse{"Failed to get gpa"})
	}

	defer gpasRows.Close()

	for gpasRows.Next() {
		var gpa GPA
		if gpaErr := gpasRows.Scan(&gpa.Credits, &gpa.GPA, &gpa.Level); gpaErr != nil {
			var msg = fmt.Sprintln("error on meetings")
			return c.JSON(500, ErrorResponse{msg})
		}

		gpas = append(gpas, gpa)
	}

	data := struct {
		Courses []Course `json:"courses"`
		Books   string   `json:"books"`
		Terms   []Term   `json:"terms"`
		Credits []GPA    `json:"credits"`
	}{
		courses,
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?><textbookorder><school id=\"244\"/><courses><course dept=\"CSI\" num=\"2340\" sect=\"43069\" term=\"F20\"/><course dept=\"CSI\" num=\"4500\" sect=\"43064\" term=\"F20\"/><course dept=\"CSI\" num=\"4999\" sect=\"44975\" term=\"F20\"/><course dept=\"CSI\" num=\"5810\" sect=\"42896\" term=\"F20\"/><course dept=\"HC\" num=\"2060\" sect=\"45049\" term=\"F20\"/><course dept=\"HC\" num=\"4004\" sect=\"45367\" term=\"F20\"/></courses></textbookorder>",
		terms,
		gpas,
	}

	return c.JSON(200, data)
}

func pdf(c echo.Context) error {
	return c.File("./ou.pdf")
}

func events(c echo.Context) error {
	return c.File("./events.json")
}

func main() {
	dbURL := fmt.Sprintf("postgres://%s:%s@courses-db:5432/%s?sslmode=disable", os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASSWORD"), os.Getenv("POSTGRES_DB"))
	var err error
	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		panic(err)
	}

	fmt.Println("DB connected")

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", func(c echo.Context) error {
		return c.HTML(http.StatusOK, "Hello, Docker! <3")
	})

	e.GET("/api/v1/terms", terms)
	e.GET("/api/v1/courses/:term/pdf", pdf)
	e.GET("/api/v1/courses/:term", courses)
	e.GET("/api/v1/events/:term", events)

	httpPort := os.Getenv("HTTP_PORT")
	if httpPort == "" {
		httpPort = "8080"
	}

	e.Logger.Fatal(e.Start(":" + httpPort))
}
