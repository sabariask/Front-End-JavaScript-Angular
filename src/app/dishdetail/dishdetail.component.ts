import { dishComment } from './../shared/dishComment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
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

  @ViewChild('fform') dishForm:any;

  formErrors:any = {
    'name':'',
    'comment':''
  };

  dishDetailForm!:FormGroup;

  dish: Dish | any;
  dishIds!: string[];
  prev!: string;
  next!: string;
  comment!:dishComment;
  gridsize:number=0;



  validationMessages:any = {
    'name':{
      'required':'Author name is required.',
      'minlength':'Author name must be atleast 2 characters long.',
      'maxlength':'Author name cannot be more than 25 characters.'
    },
    'comment':{
      'required':'Comment is required.'
    }
  }

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb:FormBuilder
  ) {
    this.createForm();
  }

  createForm(){
    this.dishDetailForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      comment:['',Validators.required],
    })
    this.dishDetailForm.valueChanges.subscribe(
      (data)=>{
        this.onValueChanged(data);
      }
    );
    this.onValueChanged();
  }

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

  onValueChanged(data?:any){
    if(!this.dishDetailForm){
      return;
    }
    const form = this.dishDetailForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        // clear previous error message
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  updateSetting(event:any) {
    this.gridsize = event.value;
  }

  setPrevNext(dishId:string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index-1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index+1) % this.dishIds.length];
  }

  getBack(): void {
    this.location.back();
  }

  // formatLabel(value: number): string {
  //   if (value <= 5) {
  //     return Math.round(value / 5)+'';
  //   }

  //   return `${value}`;
  // }

  onSubmit(){
    this.comment = this.dishDetailForm.value;
    console.log(this.comment);
    this.dishDetailForm.reset({
      name:'',
      comment:''
    });
    this.dishForm.resetForm();
  }

}
