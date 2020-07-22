import React from 'react'

import PrintIcon from '@material-ui/icons/Print'
import Button from '@material-ui/core/Button'
import {
  Document,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer"

const link = {
  color: 'white',
  textDecoration: 'none'
}

const button = {
  marginLeft: '1em'
}

const icon = {
  paddingRight: 5,
  marginLeft: -5
}

const pdfStyle = StyleSheet.create({
  page: {
    padding: 10,
  },
  header: {
    backgroundColor: '#b89f74',
    textAlign: 'center',
    padding: '10px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontSize: 14
  },
  waitlistHeader: {
    backgroundColor: '#f0eded',
    textAlign: 'center',
    padding: '10px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    fontSize: 14
  },
  title: {
    paddingBottom: 8
  },
  body: {
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    padding: 10,
    fontSize: 12
  },
  desc: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 12
  },
  meeting: {
    textAlign: 'center',
    textDecoration: 'underline',
    paddingBottom: 5
  },
  item: {
    textAlign: 'center',
    paddingBottom: 10
  },
  section: {
    padding: 10,
    width: '45%'
  },
  divider: {
    width: 1,
    backgroundColor: 'black'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})

export const printCourses = (courses) => {
  const CoursesDoc = () => (
    <Document>
      <Page size="A4" style={pdfStyle.page}>
        <View>
          {courses.map(course => 
            <div key={course.crn}>
              <div style={course.waitlist === "0" ? pdfStyle.header : pdfStyle.waitlistHeader}>
                <Text style={pdfStyle.title}>{course.courseTitle}</Text>
                <Text>
                  {course.subjectCode}-{course.subjectNumber}-
                  {course.section}-{course.crn}
                </Text>
                <Text>Credits: {course.credit}</Text>
                {course.waitlist !== "0" && <Text>Waitlist: {course.waitlist}</Text>}
              </div>
              <div style={pdfStyle.body}>
                <Text style={pdfStyle.desc}>{course.courseDescription}</Text>
                <div style={pdfStyle.container}>
                <div style={pdfStyle.section}>
                  <Text style={pdfStyle.meeting}>Course Meeting(s):</Text>
                  <div>
                    {course.meetings.map(meeting => 
                      <div style={pdfStyle.item} key={meeting.crn}>
                        <Text>{meeting.location} - {meeting.campus}</Text>
                        <Text>{meeting.meetDays}</Text>
                        <Text>{meeting.startTime} - {meeting.endTime}</Text>
                        <Text>{meeting.startMonth}/{meeting.startDay}/{meeting.startYear} - {meeting.endMonth}/{meeting.endDay}/{meeting.endYear}
                        </Text>
                        <Text>{meeting.courseType}</Text>
                      </div>
                    )}
                  </div>  
                </div>
                <div style={pdfStyle.divider} />
                <div style={pdfStyle.section}>
                  <Text style={pdfStyle.meeting}>Course Instructor(s):</Text>
                  <div>
                    {course.instructors.map(instructor => 
                      <div style={pdfStyle.item} key={instructor.crn}>
                        <Text>{instructor.firstName} {instructor.lastName}</Text>
                        <Text>{instructor.email}</Text>
                        <Text>{instructor.office}</Text>
                      </div>
                    )}
                  </div>
                </div>
                </div>
              </div>
            </div>
          )}
        </View>
      </Page>
    </Document>
  )

  return (
    <div style={button}>
      <PDFDownloadLink style={link} document={<CoursesDoc />} fileName="course-list.pdf">
        <Button
          color="secondary"
          title="Print Courses"
          variant="contained"
          tabIndex="0"
        >
          <PrintIcon style={icon}/>
          Print Courses
        </Button>
      </PDFDownloadLink>
    </div>
  )
}
