import { IUserState, UserObj } from "../../app/models/user";

const ACTION_PLACEHOLDER: string = "[User]";

export namespace UserAction {
  export class SetUserData {
    public static readonly type: string = '${ACTION_PLACEHOLDER} Set User Data';
    constructor(public payload: UserObj) {}
  }
}