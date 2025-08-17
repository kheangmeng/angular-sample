import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BService } from './b-service';
import { BRoutingModule } from './b-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BRoutingModule
  ],
  providers: [BService]
})
export class BModule { }
