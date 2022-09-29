import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImageMissing]'
})
export class ImageMissingDirective {
  constructor(private el: ElementRef) {}

  @HostListener("error")
  private onError() {
    let ruta = 'assets/images/no-image.png';
    this.el.nativeElement.src = ruta;

  }

}
