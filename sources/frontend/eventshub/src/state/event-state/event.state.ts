import { Event, IEventState } from "../../app/models/event";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { EventAction } from "./event.action";
import { produce } from "immer";
import { EventsService } from "../../app/services/events.service";
import { catchError, from, tap } from "rxjs";

const DEFAULT_STATE: IEventState = {
    publicEvents:[],
    myEvents:[]
};

@State<IEventState>({
  name: 'eventList',
  defaults: DEFAULT_STATE
})
@Injectable()
export class EventState {

  constructor(private eventService: EventsService,private store: Store) {}
  
    @Action(EventAction.SetEventDataList)
    public setEventDataList({ getState, setState }: StateContext<IEventState>,  { payload }: EventAction.SetEventDataList): any {
      setState(
        produce(getState(), draft => {
          draft.publicEvents = payload;
        })
      );
    }

    @Action(EventAction.SetMyAEventDataList)
    public setMyAEventDataList({ getState, setState }: StateContext<IEventState>,  { payload }: EventAction.SetMyAEventDataList): any {
      setState(
        produce(getState(), draft => {
          draft.myEvents = payload;
        })
      );
    }

    @Action(EventAction.FetchEvents)
    fetchEvents(ctx: StateContext<any>) {
      return from(this.eventService.retrieveAllEvents())
        .pipe(
          tap(events => {
            this.store.dispatch(new EventAction.SetEventDataList(events));
          }),
          catchError(error => { //
            // Handle the error accordingly or rethrow
            throw error; //da capire se si riescono ad usare effect
          })
        );
    }


    @Action(EventAction.FetchMyEvents)
    fetchMyEvents(ctx: StateContext<any>) {
      return from(this.eventService.retrieveMyEvents())
        .pipe(
          tap(events => {
              this.store.dispatch(new EventAction.SetMyAEventDataList(events));
          }),
          catchError(error => {
            // Handle the error accordingly or rethrow
            throw error;
          })
        );
    }

    @Action(EventAction.EventParticipate)
    eventPartecipate(ctx: StateContext<any>,action: EventAction.EventParticipate) {
      const event = action.event; 
      return from(this.eventService.eventParticipate(event))
        .pipe(
          tap((updatedEvent: Event) => {
            const currentState = ctx.getState();
      
            // Aggiorna o aggiungi l'evento aggiornato in `publicEvents`
            const updatedPublicEvents = currentState.publicEvents.map((e: { id: string | null; }) => 
              e.id === updatedEvent.id ? updatedEvent : e
            );
            // Aggiorna lo stato
            ctx.patchState({
              publicEvents: updatedPublicEvents
            });
      
            console.log("Success: Event updated in both publicEvents and myEvents");
          }),
          catchError((error: any) => {
            // Handle the error accordingly or rethrow
            throw error;
          })
        )
    }

    @Selector()
    static getEventData(state: IEventState) {
      return state?.publicEvents;
    }

    @Selector()
    static getMyEventData(state: IEventState) {
      return state?.myEvents;
    }
}

