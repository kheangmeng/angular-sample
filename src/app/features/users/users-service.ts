import { Injectable, OnDestroy, OnInit } from "@angular/core"
import { delay, Observable, of } from "rxjs"

export class User {
  constructor(public id: number, public name: string,){}
}

const users: User[] = [
  new User(1, 'jonh doe'),
  new User(2, 'jane doe'),
  new User(3, 'smit tow'),
  new User(4, 'amei lang'),
  new User(5, 'steven bee'),
  new User(6, 'ronal den'),
]

const fetchDelay = 500

@Injectable()
export class UserService implements OnInit, OnDestroy {
  constructor() { console.log('on created') }
  ngOnInit() { console.log('on mounted') }
  ngOnDestroy() { console.log('on destroyed') }

  getUsers(): Observable<User[]> {
    return of(users).pipe(delay(fetchDelay))
  }

  getUser(id: number | string): Observable<User> {
    const user = of(users.find(u => u.id === Number(id))!).pipe(delay(fetchDelay))
    if(!user) {
      throw new Error('User not found')
    }
    return user
  }
}
