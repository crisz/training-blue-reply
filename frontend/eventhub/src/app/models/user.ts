export interface IUserState {
    userDate?: UserObj
  }

  export interface UserObj {
    id:number | null,
    email:string | null,
    password:string | null,
    username:string | null
  }
