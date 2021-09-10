import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Course, Credit } from '../types';

interface GradesProps extends React.HTMLAttributes<HTMLElement> {
  courses: Course[];
  credits: Credit[];
}

interface CourseGradesProps {
  courses: Course[];
}

interface CreditsProps {
  credits: Credit[];
}

const useStyles = makeStyles((theme) => ({
  error: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fafafa',
  },
  classHeader: {
    backgroundColor: theme.palette.primary.light,
  },
  classHeaderSpan: {
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.75)',
    fontSize: 16,
  },
  tableCell: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 600,
    fontSize: 14,
    width: '33%',
  },
  empty: {
    textAlign: 'center',
  },
  mobile: {
    overflowX: 'scroll',
  },
}));

const CourseGrades = ({ courses }: CourseGradesProps) => {
  return (
    <>
      {courses.map((course, i) => {
        return (
          <TableRow key={i}>
            <TableCell>
              {course.subjectCode} - {course.subjectNumber}
            </TableCell>
            <TableCell>{course.grade.credit}</TableCell>
            <TableCell>{course.grade.grade}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

const Credits = ({ credits }: CreditsProps) => {
  return (
    <>
      {credits.map((credit, i) => {
        return (
          <TableRow key={i}>
            <TableCell>{credit.standing}</TableCell>
            <TableCell>{credit.credits}</TableCell>
            <TableCell>{credit.gpa}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

const Grades = (props: GradesProps) => {
  const classes = useStyles();
  const { credits, courses } = props;
  if (courses.length === 0) {
    return <Typography className={classes.empty}>No data to display</Typography>;
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.classHeader}
        title={
          <Typography tabIndex={0} className={classes.classHeaderSpan}>
            Grades and Credits
          </Typography>
        }
      />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} scope='col'>
                Level
              </TableCell>
              <TableCell className={classes.tableCell} scope='col'>
                Grades
              </TableCell>
              <TableCell className={classes.tableCell} scope='col'>
                GPA
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Credits credits={credits} />
          </TableBody>
        </Table>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} scope='col'>
                Course
              </TableCell>
              <TableCell className={classes.tableCell} scope='col'>
                Credits
              </TableCell>
              <TableCell className={classes.tableCell} scope='col'>
                Grades
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <CourseGrades courses={courses} />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Grades;
