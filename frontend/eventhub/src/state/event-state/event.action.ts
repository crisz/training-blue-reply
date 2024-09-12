import { IEventState, EventObj } from "../../app/models/event";

const ACTION_PLACEHOLDER: string = "[EventList]";

export namespace EventAction {
  export class SetEventDataList {
    public static readonly type: string = '${ACTION_PLACEHOLDER} Set Event Data List';
    constructor(public payload: EventObj[]) {}
  }

  export class SetMyAEventDataList {
    public static readonly type: string = '${ACTION_PLACEHOLDER} Set MyA Event Data List';
    constructor(public payload: EventObj[]) {}
  }
}