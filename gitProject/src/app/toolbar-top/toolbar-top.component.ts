import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-top',
  templateUrl: './toolbar-top.component.html',
  styleUrls: ['./toolbar-top.component.css']
})
export class ToolbarTopComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  goToSearch() {
    this.router.navigateByUrl("/");
  }

}
