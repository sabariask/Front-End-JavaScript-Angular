import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    dish: Dish|undefined;

    constructor(private dishService:DishService, private location:Location, private route:ActivatedRoute) { }

    ngOnInit(): void {
        let id = this.route.snapshot.params['id'];
        this.dishService.getDish(id).subscribe((dish:any)=>this.dish = dish);
    }

    getBack():void{
        this.location.back();
    }

}
