import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  search(searched: string){
    console.log("search", searched);
    this.router.navigateByUrl('search/'+ searched);
 }

 

}
