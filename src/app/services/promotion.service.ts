import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions():Observable<Promotion[] | undefined>{
    return of(PROMOTIONS).pipe(delay(2000))
  }
  getPromotion(id:string):Observable<Promotion | undefined>{
    return of(PROMOTIONS.filter((promo)=>promo.id===id)[0]).pipe(delay(2000))
  }
  getFeaturedPromotion():Observable<Promotion | undefined>{
    return of(PROMOTIONS.filter((promo)=>promo.featured)[0]).pipe(delay(2000));
  }
}
