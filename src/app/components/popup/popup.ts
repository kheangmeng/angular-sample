import { Component, inject, input, output } from '@angular/core';


@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.html',
  styleUrl: './popup.css'
})
export class InputSearch {
  openPopup = input<boolean>(false);
  closePopup = output<boolean>();
}
