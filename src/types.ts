export enum SubjectCode {
    CSI,
    CSE,
    HC
}

export enum RegistrationStatus {
    RW
}

export enum CourseTypeCode {
    CLAS,
    PROJ
}

export interface Credit {
    standing: string,
    gpa: number,
    credits: number
}

export interface Grade {
    credit: number,
    grade: number,
    crn: number
}

export interface Meeting {
    crn: number,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    courseType: string,
    courseTypeCode: CourseTypeCode,
    location: string,
    campus: string,
    meetDays: string,
    startHour: number,
    startMinutes: number,
    startMonth: number,
    startYear: number,
    startDay: number,
    startDayOfWeek: number,
    startWeekOfMonth: number,
    endHour: number,
    endMinutes: number,
    endMonth: number,
    endYear: number,
    endDay: number,
    endDayOfWeek: number,
    endWeekOfMonth: number
}

export interface Instructor {
    crn: number,
    firstName: string,
    lastName: string,
    office: string,
    email: string
}

export interface Term {
    description: string,
    code: number,
    start: string,
    end: string,
    current: boolean
}

export interface Course {
    crn: number,
    waitlist: number,
    registrationStatus: RegistrationStatus,
    registrationStatusDescription: string,
    departmentCode: SubjectCode,
    departmentDescription: string,
    courseTitle: string,
    courseDescription: string,
    subjectCode: SubjectCode,
    subjectNumber: number,
    section: string,
    credit: number,
    grade: Grade,
    meetings: Meeting[],
    instructors: Instructor[]
}


export interface InitialState {
    books: string,
    credits: Credit[],
    terms: Term[],
    courses: Course[],
    fetching: boolean,
    fetched: boolean,
    error: boolean,
    term_bounds: string[],
    selected_term: Term,
    events: [],
}

export interface EventExtendedProps {
    desc: string,
    location: string,
    startTime: string,
    endTime: string
}

export interface Event {
    startRecur: string,
    endRecur: string,
    startTime: string,
    endTime: string,
    title: string,
    color: string,
    crn: number,
    daysOfWeek: number[],
    extendedProps: EventExtendedProps[]
}

export interface CourseData {
    courses: Course[],
    terms: Term[],
    books: string,
    credit: Credit[]
}

export interface CoursesRequestBody {
    code?: number
}

export interface EventsResponseBody {
    events: Event[]
}

export interface TermsResponseBody {
    courses: Course[],
    terms: Term[],
    books: string,
    credits: Credit[]
}

export interface CurrentTermResponse {
    current_term: number
}

export interface TermsResponse {
    terms: Term[]
}