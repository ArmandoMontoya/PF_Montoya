import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[cabeceraDirective]'
})
export class CabecerasDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.fontSize = '20px';
    this.el.nativeElement.style.fontWeight = 'bold';
 }

}
