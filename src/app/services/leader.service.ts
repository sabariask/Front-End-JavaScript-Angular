import { Injectable } from '@angular/core';
import { LEADER } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():LEADER[]{
    return LEADERS;
  }
  getFeaturedLeader():LEADER{
    return LEADERS.filter((leader)=>leader.featured)[0];
  }
}
