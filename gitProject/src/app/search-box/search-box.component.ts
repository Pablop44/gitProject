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
    this.optionUser = [new User("Albovy", null, null, "https://avatars3.githubusercontent.com/u/55434173?v=4", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)]
  }

  ngOnInit(): void {
  }

  changeUsername(event: any){
    if (this.delaySearch){
      if (this.timer){
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.searchUsers, 1000, event.target.value, this.userService);
    }else {
      this.searchUsers(event.target.value, this.userService);
    }
  }

  searchUsers(username, userService) {
    if (username.length > 0) {
      this.params = {
        q: username
      }
      userService.searchUserByName(this.params)
      .subscribe(
        response=>{
          this.optionUser = []
          const optionUserUploaded = []
          response.items.forEach(element => {
            const userToPush = new User(element.login, element.id, element.node_id, element.avatar_url, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
            optionUserUploaded.push(userToPush)
          });
          this.optionUser = optionUserUploaded
          this.optionUser = [...this.optionUser];
          console.log(this.optionUser)
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
