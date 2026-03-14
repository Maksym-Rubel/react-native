 export enum PriorityEnum {
    low = "low",
    medium = "medium",
    high = "high",
}

export interface IFormInput {
    todo: string
    data: string
    priority: PriorityEnum
}
