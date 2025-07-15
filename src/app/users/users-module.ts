import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './users-list-component';
import { UserDetailComponent } from './users-detail-component';
import { UserService } from './users-service';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  // declarations: [UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  providers: [UserService]
})
export class UsersModule { }
