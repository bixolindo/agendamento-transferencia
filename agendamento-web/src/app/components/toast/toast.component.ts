import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() type: string = 'success'; // Tipo de mensagem ('success' ou 'danger')
  @Input() isVisible: boolean = false; // Controle de visibilidade

  hideToast() {
    this.isVisible = false;
  }
}