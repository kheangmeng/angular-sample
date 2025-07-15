import { Component, effect, inject, OnInit } from "@angular/core";
import { User, UserService } from "./users-service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'user-detail',
  template: `
    <h2>User Detail</h2>
    @if (loading) {
      <div>Loading...</div>
    } @else if(user) {
      <div>Name: {{user.name}}</div>
    } @else {
      <div>User not found</div>
    }
  `
})

export class UserDetailComponent implements OnInit {
  readonly userId: number
  public router = inject(ActivatedRoute)
  public user: User
  public loading: boolean
  constructor(private userService: UserService) {
    effect(() => {
      this.fetchUser()
    })
    this.userId = Number(this.router.snapshot.paramMap.get('id'))
    this.user = new User(0, '')
    this.loading = true
  }
  ngOnInit() {
    console.log('init')
    // this.fetchUser()
  }

  fetchUser() {
    this.userService.getUser(this.userId).subscribe({
      next: user => {
        this.user = user
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
        this.loading = false
      },
    })
  }
}
