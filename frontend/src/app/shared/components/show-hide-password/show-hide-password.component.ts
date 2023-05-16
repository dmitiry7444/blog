import {Component, ContentChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrls: ['./show-hide-password.component.scss']
})
export class ShowHidePasswordComponent {
  showPassword = false;
  @ContentChild('input') input!: ElementRef;
  constructor() {}
  toggleShow() {
    console.log(this.input)
    this.showPassword = !this.showPassword;
    this.input.nativeElement.type = this.showPassword ? 'text' : 'password';
  }
}
