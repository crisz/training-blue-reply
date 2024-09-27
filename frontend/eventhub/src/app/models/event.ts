export interface IEventState {
    publicEvents: Event[],
    myEvents: Event[]
  }

  export interface Event {
    id:string | null,
    place:string | null,
    imageUrl:string,
    title:string,
    description:string,
    participantIds: []
  }
