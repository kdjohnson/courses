import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Domain from '@material-ui/icons/DomainSharp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MailOutline from '@material-ui/icons/MailOutline';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { getMapUrl } from '../utils/mapLinks';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { Course, Instructor } from '../types';

interface InstructorsProps {
  course: Course;
}

interface InstructorProps {
  instructors: Instructor[];
}

const useStyles = makeStyles((theme) => ({
  instructor: {
    fontSize: 16,
    fontWeight: 'bolder',
    color: theme.palette.text.primary,
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.light,
    padding: 16,
  },
  title: {
    fontWeight: 600,
    paddingTop: 3,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const NoInstructorBody = () => {
  const classes = useStyles();
  return (
    <List
      subheader={
        <ListSubheader tabIndex={0} className={classes.instructor} disableSticky={true}>
          N/A
        </ListSubheader>
      }
    >
      <ListItem>
        <ListItemIcon>
          <MailOutline />
        </ListItemIcon>
        <ListItemText secondary='N/A' />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Domain />
        </ListItemIcon>
        <ListItemText secondary='N/A' />
      </ListItem>
    </List>
  );
};

const InstructorBody = ({ instructors }: InstructorProps) => {
  const classes = useStyles();
  return (
    <div>
      {instructors.map((instructor, i) => {
        return (
          <List
            subheader={
              <ListSubheader tabIndex={0} className={classes.instructor} disableSticky={true}>
                {`${instructor.firstName} ${instructor.lastName}`}
              </ListSubheader>
            }
            key={i}
          >
            <ListItem>
              <ListItemIcon>
                <MailOutline />
              </ListItemIcon>
              <ListItemText
                secondary={
                  instructor.email !== 'N/A' ? (
                    <a
                      href={'mailto:' + instructor.email}
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      {instructor.email}
                    </a>
                  ) : (
                    'N/A'
                  )
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Domain />
              </ListItemIcon>
              <ListItemText
                secondary={
                  instructor.office !== 'N/A' ? (
                    <a
                      href={getMapUrl(instructor.office, instructor.office)}
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      {instructor.office}
                    </a>
                  ) : (
                    'N/A'
                  )
                }
              />
            </ListItem>
          </List>
        );
      })}
    </div>
  );
};

export default function Instructors(props: InstructorsProps) {
  const { course } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const instructors = course.instructors;

  return (
    <div>
      <Button onClick={() => setOpen(true)} color='secondary'>
        {instructors.length <= 1 ? 'Instructor' : 'Instructors'}
      </Button>
      <Dialog
        open={open}
        id='instructor-dialog'
        tabIndex={0}
        aria-label='instructor information'
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle className={classes.dialogTitle} disableTypography={true}>
          <Typography variant='h6' tabIndex={0} className={classes.title}>
            {instructors.length <= 1 ? 'Instructor Information' : 'Instructors Information'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {instructors.length === 0 ? (
            <NoInstructorBody />
          ) : (
            <InstructorBody instructors={instructors} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='secondary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
