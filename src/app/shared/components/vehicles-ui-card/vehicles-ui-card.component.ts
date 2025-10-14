import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vehicles-ui-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './vehicles-ui-card.component.html',
  styleUrl: './vehicles-ui-card.component.scss'
})
export class VehiclesUiCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() clickable = false;
  @Input() type?: string;
}
