import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { HomeService } from './home-service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage extends HomeService {

}
