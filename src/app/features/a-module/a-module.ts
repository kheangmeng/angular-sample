import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AService } from './a-service';
import { ARoutingModule } from './a-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ARoutingModule
  ],
  providers: [AService]
})
export class AModule { }
