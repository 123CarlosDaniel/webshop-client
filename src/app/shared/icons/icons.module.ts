import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class IconsModule {
  private domSanitizer = inject(DomSanitizer);
  private matIconRegistry = inject(MatIconRegistry);

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'webshop',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/webshop.svg'
      ),
    )
  }
}
