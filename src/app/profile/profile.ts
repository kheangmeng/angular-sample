import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private route = inject(ActivatedRoute)

  constructor() {
    const snapshot = this.route.snapshot
    console.log('url:', snapshot.url)
    console.log('params:', snapshot.params)
    console.log('query params:', snapshot.queryParams)
  }
}
