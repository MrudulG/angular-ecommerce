import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-ecommerce';
  category_id = 1;

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(){
    console.log("In app component");
  }


  
}
