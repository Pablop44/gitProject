import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/services/user/user-service.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  userService: UserServiceService;
  params: any
  private timer: any;
  private delaySearch: boolean = true;
  optionUser: any[]

  constructor(userService: UserServiceService, private route : ActivatedRoute, private router: Router) {
    this.userService = userService
    this.optionUser = []
  }

  ngOnInit(): void {
  }

  changeUsername(event: any){
    if (this.delaySearch){
      if (this.timer){
        clearTimeout(this.timer);
      }
      this.optionUser = []
      this.timer = setTimeout(this.searchUsers, 500, event.target.value, this.userService, this.optionUser);
    }else {
      this.searchUsers(event.target.value, this.userService, this.optionUser);
    }
  }

  searchUsers(username, userService, optionUser) {
    if (username.length > 0) {
      this.params = {
        q: username
      }
      userService.searchUserByName(this.params)
      .subscribe(
        response=>{
          response.items.forEach(element => {
            optionUser.push(new User(element.login, element.id, element.node_id, element.avatar_url, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null))
          });
        },
        error=>{
          console.log(error)
        }
      );
    }
  }

  getSelectedValue(username:string){
    if (username != undefined && username != null) {
      this.redirectDetailedView(username)
    }
  }

  redirectDetailedView(username) {
    this.router.navigateByUrl("/user/" + username);
  }
}
