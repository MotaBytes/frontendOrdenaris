import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent implements OnInit, OnDestroy {
  slides = [
    {
      subtitle: 'Best Deal Online on smart watches',
      title: 'SMART WEARABLE.',
      offer: 'UP to 80% OFF',
      imageUrl: 'https://png.pngtree.com/png-vector/20240309/ourmid/pngtree-the-smartwatch-banner-png-image_11919210.png'
    },
    {
      subtitle: 'Latest Collection for your home',
      title: 'MODERN FURNITURE.',
      offer: 'UP to 60% OFF',
      imageUrl: 'https://png.pngtree.com/png-vector/20230909/ourmid/pngtree-home-furniture-asset-3d-rendering-png-image_10011221.png'
    },
    {
      subtitle: 'Explore the new generation',
      title: 'NEW GADGETS.',
      offer: 'Starting at $99',
      imageUrl: 'https://png.pngtree.com/png-vector/20240805/ourmid/pngtree-comprehensive-guide-to-the-latest-tech-gadgets-png-image_13386781.png'
    }
  ];

  currentIndex = 0;
  private intervalId?: number;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    window.clearInterval(this.intervalId);
  }

  startAutoPlay(): void {
    this.intervalId = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}
