import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[hidePassword]'
})
export class HidePasswordDirective {
  span: Element;

  constructor(private el: ElementRef) {
    const parent = this.el.nativeElement.parentNode;

    this.span = document.createElement('span');
    this.span.innerHTML = `Show password`;
    this.span.addEventListener('click', () => this.toggle());
    parent.appendChild(this.span);
  }


  toggle() {
    const currentType = this.el.nativeElement.getAttribute('type');

    if (currentType === "password") {
      this.el.nativeElement.setAttribute('type', 'text');
      this.span.innerHTML = 'Hide password';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      this.span.innerHTML = 'Show password';
    }
  }
}