import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarBlankComponent } from 'src/app/components/navbar-blank/navbar-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { window } from 'rxjs';

@Component({
  selector: 'app-layout-blank',
  standalone: true,
  imports: [CommonModule,NavbarBlankComponent,RouterOutlet,FooterComponent],
  templateUrl: './layout-blank.component.html',
  styleUrls: ['./layout-blank.component.scss']
})
export class LayoutBlankComponent {
  toUp():void{
    scrollTo(0,0)
  }
}
