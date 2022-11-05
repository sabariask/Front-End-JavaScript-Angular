import { Injectable } from '@angular/core';
import { LEADER } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Promise<LEADER[]>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS),2000)
    });
  }
  getFeaturedLeader():Promise<LEADER>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.featured)[0])
    ,2000)});
  }
  getLeader(id:string):Promise<LEADER>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.id===id)[0]),2000)
    });
  }
}
