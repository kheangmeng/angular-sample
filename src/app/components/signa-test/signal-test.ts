import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { SignalTestService} from './signal-test-service';

@Component({
  selector: 'signal-test',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './signal-test.html',
})
export class HomePage extends SignalTestService {

}
