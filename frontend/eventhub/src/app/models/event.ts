export interface IEventState {
    eventDate?: EventObj[],
    myEvents?: EventObj[]
  }

  export interface EventObj {
    id:string | null,
    place:string | null,
    imageUrl:string | null,
    title:string | null,
    description:string | null,
    participantIds: []
  }
