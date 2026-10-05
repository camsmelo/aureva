import { AfterViewInit, Component, OnDestroy, output } from '@angular/core';

@Component({
  selector: 'app-site-header',
  standalone: true,
  templateUrl: './site-header.component.html'
})
export class SiteHeaderComponent implements AfterViewInit, OnDestroy {
  readonly bookingRequested = output<void>();

  activeSection = 'inicio';
  isMenuOpen = false;
  private observer?: IntersectionObserver;

  readonly navigation = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre nós' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'avaliacoes', label: 'Avaliações' },
    { id: 'contato', label: 'Contato' }
  ];

  ngAfterViewInit(): void {
    const sections = this.navigation
      .map(item => document.getElementById(item.id))
      .filter((section): section is HTMLElement => !!section);

    if (!('IntersectionObserver' in window) || sections.length === 0) {
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const section = visibleSections[0]?.target as HTMLElement | undefined;
        if (section?.id) {
          this.activeSection = section.id;
        }
      },
      {
        root: null,
        rootMargin: '-88px 0px -55% 0px',
        threshold: [0.05, 0.2, 0.5]
      }
    );

    sections.forEach(section => this.observer?.observe(section));
  }

selectSection(id: string): void {
  this.activeSection = id;
  this.isMenuOpen = false;
}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
