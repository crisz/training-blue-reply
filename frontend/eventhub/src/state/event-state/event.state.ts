import { IEventState } from "../../app/models/event";
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
      console.log('Azione FetchEvents dispatchata');
      return from(this.eventService.retrieveAllEvents())
        .pipe(
          tap(events => {
              console.log('Eventi ricevuti', events); // Log per vedere se i dati vengono ricevuti
            this.store.dispatch(new EventAction.SetEventDataList(events));
          }),
          catchError(error => {
            console.error('Error fetching events:', error);
            // Handle the error accordingly or rethrow
            throw error;
          })
        );
    }


    @Action(EventAction.FetchMyEvents)
    fetchMyEvents(ctx: StateContext<any>) {
      console.log('Azione FetchEvents dispatchata');
      return from(this.eventService.retrieveMyEvents())
        .pipe(
          tap(events => {
              console.log('Eventi ricevuti', events); // Log per vedere se i dati vengono ricevuti
              this.store.dispatch(new EventAction.SetMyAEventDataList(events));
          }),
          catchError(error => {
            console.error('Error fetching events:', error);
            // Handle the error accordingly or rethrow
            throw error;
          })
        );
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

