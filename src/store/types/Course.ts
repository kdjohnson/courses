import { Grade } from "./Grade"
import { Meeting } from "./Meeting"
import { Instructor } from "./Instructor"

export interface Course {
    id: number,
    description: string,
    title: string,
    credit: string,
    crn: string,
    departmentCode: string,
    departmentDescription: string,
    grade: Grade,
    instructors: Instructor[],
    meetings: Meeting[],
    registrationStatus: string,
    registrationStatusDescription: string,
    section: string,
    subjectCode: string,
    subjectNumber: string,
    termCode: string,
    waitlist: string
}