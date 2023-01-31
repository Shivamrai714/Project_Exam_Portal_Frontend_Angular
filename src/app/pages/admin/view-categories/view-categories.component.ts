import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

   //setting the tempory var categories , later we will fetch it from the database.

   categories=[
    {
      cid:23,
      title:'Fake Category',
      description:' !!  Start the springboot server  OR  !! Issue CORS policy , Reset browser to original setting clean up   ... Later data is fetched from the datbase',
    },
    
   ];


  constructor(private _category:CategoryService) { }

  ngOnInit(): void {

   this._category.categories().subscribe(
    (data:any) => {
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>
    {
      console.log(error);
      Swal.fire('Error !! ','Error in loading data','error');
    }
   );


  }

}
