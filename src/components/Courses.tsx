import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CourseDetails from './CourseDetails';
import CourseHeader from './CourseHeader';
import Instructors from './Instructors';
import Meetings from './Meetings';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Course } from '../types';

interface CoursesProps extends React.HTMLAttributes<HTMLElement> {
  courses: Course[];
}

interface CourseProps {
  courses: Course[];
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  courseContainer: {
    flex: '1 1 auto',
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  card: {
    backgroundColor: '#fafafa',
    minHeight: 336,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: 290,
  },
  content: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
  },
  loading: {
    display: 'flex',
    marginTop: 50,
    justifyContent: 'center',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    marginTop: '2em',
  },
  waitlistContainer: {
    marginTop: '1em',
  },
  actions: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 45,
  },
}));

const CourseCards = ({ courses }: CourseProps) => {
  const classes = useStyles();

  return (
    <>
      {courses?.map((course) => {
        return (
          <div className={classes.courseContainer} key={course.crn}>
            <div className={classes.container}>
              <Card className={classes.card}>
                <CourseHeader course={course} />
                <CardContent className={classes.content}>
                  <div
                    className={
                      course.waitlist === 0 ? classes.container : classes.waitlistContainer
                    }
                  >
                    <Meetings course={course} />
                  </div>
                </CardContent>
                <CardActions className={classes.actions}>
                  <CourseDetails course={course} />
                  <Instructors course={course} />
                </CardActions>
              </Card>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default function Courses(props: CoursesProps) {
  const classes = useStyles();
  const { courses } = props;

  if (courses.length === 0) {
    return (
      <Typography className={classes.empty} tabIndex={0}>
        You currently have no courses for this semester.
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <CourseCards courses={courses} />
    </div>
  );
}
