import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[pkmnBorderCard]',
    standalone: true
})
export class BorderCardDirective {
  
  private initialColor: string = '#f5f5f5';
  private defaultColor: string = 'blue';
  private defaultHeight: number = 180;
  
  @Input('pkmnBorderCard') borderColor: string;

  constructor(private el: ElementRef) {
    console.log(this.defaultHeight)
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  }
  
  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  private setBorder(color: string) {
    let border = 'solid 4px ' + color;
    this.el.nativeElement.style.border = border;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }
}
