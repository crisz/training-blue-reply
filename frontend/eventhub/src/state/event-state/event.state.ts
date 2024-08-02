import { IEventState } from "../../app/models/event";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EventAction } from "./event.action";
import { produce } from "immer";

const DEFAULT_STATE: IEventState = {
    eventDate:[]
};

@State<IEventState>({
  name: 'eventList',
  defaults: DEFAULT_STATE
})
@Injectable()
export class EventState {
  
    @Action(EventAction.SetEventDataList)
    public setEventDataList({ getState, setState }: StateContext<IEventState>,  { payload }: EventAction.SetEventDataList): any {
      setState(
        produce(getState(), draft => {
          draft.eventDate = payload;
        })
      );
    }

    @Selector()
    static getEventData(state: IEventState) {
      return state?.eventDate;
    }
}

