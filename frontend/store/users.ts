import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import axios from 'axios'
import { User } from "../types/user"

@Module({
  name: 'users',
  stateFactory: true,
  namespaced: true,
})
export default class UserModule extends VuexModule {
  users: User | null = null;
  _token: string | null;
  constructor (module: any){
      super(module);
      this._token = localStorage.getItem("LoginToken")
  }

  @Mutation
  setUsers(users: User) {
    this.users = users
  }
  
  @Mutation
  setToken(token:string | null) {
    this._token = token;
    if (token) {
        localStorage.setItem("LoginToken", token);
    }else{
        localStorage.removeItem("LoginToken");
    }
  }

  @Action
  async getUsers() {
    // const users: User = await axios.get('/users');
    // this.setUsers(users)
    
  }
  get token() {
    return this._token;
  }
}
