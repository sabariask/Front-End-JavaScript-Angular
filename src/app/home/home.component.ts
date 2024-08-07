import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { LEADER } from '../shared/leader';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dish: Dish | undefined;
  promotion: Promotion | undefined;
  feature: LEADER | undefined;
  dishError: string | undefined;
  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL:string
  ) {}

  ngOnInit(): void {
    this.dishService
      .getFeaturedDish()
      .subscribe((dish: any) => (this.dish = dish), errMsg => this.dishError = <any>errMsg);
    this.promotionService
      .getFeaturedPromotion()
      .subscribe((promotion) => (this.promotion = promotion));
    this.leaderService
      .getFeaturedLeader()
      .subscribe((leader) => (this.feature = leader));
    console.log(this.feature);
  }
}
