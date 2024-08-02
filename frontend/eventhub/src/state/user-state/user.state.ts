import { IUserState, UserObj } from "../../app/models/user";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserAction } from "./user.action";
import { produce } from "immer";

const DEFAULT_STATE: IUserState = {
    userDate:{ email:null,password:null,username:null
 }
};

@State<IUserState>({
  name: 'user',
  defaults: DEFAULT_STATE
})
@Injectable()
export class UserState {
  
    @Action(UserAction.SetUserData)
    public setUserData({ getState, setState }: StateContext<IUserState>,  { payload }: UserAction.SetUserData): any {
      setState(
        produce(getState(), draft => {
          draft.userDate = payload;
        })
      );
    }

    @Selector()
    static getUserData(state: IUserState) {
      return state?.userDate;
    }

    @Selector()
    static getUserEmail(state: IUserState) {
      return state?.userDate?.email;
    }
}

