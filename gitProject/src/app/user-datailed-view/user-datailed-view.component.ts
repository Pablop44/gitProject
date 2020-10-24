import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs';
import { User } from 'src/app/models/User';
import { Repository } from 'src/app/models/repository';
import { UserServiceService } from 'src/services/user/user-service.service';

@Component({
  selector: 'app-user-datailed-view',
  templateUrl: './user-datailed-view.component.html',
  styleUrls: ['./user-datailed-view.component.css']
})
export class UserDatailedViewComponent implements OnInit {

  username: string;

  user: User
  sub: Subscription;
  userService: UserServiceService;
  params: any
  repositories: Repository[]
  followers: User[]

  constructor(private router : Router, private route : ActivatedRoute, userService: UserServiceService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.username = params['username']
      });
    this.getInfoRepos()
    this.getInfoFollowers()
    this.searchUsers(this.userService)
  }

  getInfoRepos(){
    this.params = {
      username: this.username
    }
    this.userService.getReposByName(this.params)
    .subscribe(
      response=>{
        const repositoriesToUpdate = []
        for (let key in response) {
          let value = response[key];
          repositoriesToUpdate.push(new Repository(value.name, value.language, value.html_url))
        }
        this.repositories = repositoriesToUpdate
      },
      error=>{
        console.log(error)
      }
    );
  }

  searchUsers(userService) {
    this.params = {
      q: this.username
    }
    userService.searchUserByName(this.params)
    .subscribe(
      response=>{
        response.items.forEach(element => {
          this.user = new User(
            this.username,
            element.id,
            element.node_id,
            element.avatar_url,
            element.gravatar_id,
            element.url,
            element.html_url,
            element.followers_url,
            element.subscriptions_url,
            element.organizations_url,
            element.repos_url,
            element.received_events_url,
            element.type,
            element.score,
            element.following_url,
            element.gists_url,
            element.starred_url,
            element.events_url,
            element.site_admin)
        });
      },
      error=>{
        console.log(error)
      }
    );
  }

  getInfoFollowers(){
    this.params = {
      username: this.username
    }
    this.userService.getFollowersByName(this.params)
    .subscribe(
      response=>{
        const followersToUpdate = []
        for (let key in response) {
          let value = response[key];
          followersToUpdate.push(new User(
            value.login,
            value.id,
            value.node_id,
            value.avatar_url,
            value.gravatar_id,
            value.url,
            value.html_url,
            value.followers_url,
            value.subscriptions_url,
            value.organizations_url,
            value.repos_url,
            value.received_events_url,
            value.type,
            value.score,
            value.following_url,
            value.gists_url,
            value.starred_url,
            value.events_url,
            value.site_admin))
        }
        this.followers = followersToUpdate
      },
      error=>{
        console.log(error)
      }
    );
  }
}
