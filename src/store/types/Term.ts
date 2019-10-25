import { string } from "prop-types"

export interface Term {
    code: string,
    current_term?: Term,
    description: string,
    end: string,
    id: number,
    is_current_term: string,
    start: string
}