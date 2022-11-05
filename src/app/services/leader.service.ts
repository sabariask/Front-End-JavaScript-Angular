import { Injectable } from '@angular/core';
import { LEADER } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Promise<LEADER[]>{
    return Promise.resolve(LEADERS);
  }
  getFeaturedLeader():Promise<LEADER>{
    return Promise.resolve(LEADERS.filter((leader)=>leader.featured)[0]);
  }
  getLeader(id:string):Promise<LEADER>{
    return Promise.resolve(LEADERS.filter((leader)=>leader.id===id)[0]);
  }
}
