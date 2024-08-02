export interface IEventState {
    eventDate?: EventObj[]
  }

  export interface EventObj {
    id:string | null,
    place:string | null,
    image:string | null,
    title:string | null,
    description:string | null
  }
