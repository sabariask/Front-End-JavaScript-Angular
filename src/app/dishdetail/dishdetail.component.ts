import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish | any;
  dishIds!: string[];
  prev!: string;
  next!: string;

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe((dish:any) => {
        this.dish = dish;
        this.setPrevNext(dish?.id)
      });
  }

  setPrevNext(dishId:string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index-1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index+1) % this.dishIds.length];
  }

  getBack(): void {
    this.location.back();
  }
}
