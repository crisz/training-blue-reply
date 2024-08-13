export interface IEventState {
    eventDate?: EventObj[],
    myEvents?: EventObj[]
  }

  export interface EventObj {
    id:string | null,
    place:string | null,
    imageUrl:string | null,
    title:string,
    description:string,
    participantIds: []
  }
