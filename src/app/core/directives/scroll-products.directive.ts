import { Directive, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appScrollProducts]',
  standalone: true
})
export class ScrollProductsDirective implements OnInit, OnDestroy {

  @Output() public scrolled = new EventEmitter<void>();

  private elementRef = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.scrolled.emit();
      }
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

}
