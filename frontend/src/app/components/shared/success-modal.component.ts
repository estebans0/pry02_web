import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 class="text-yellow-400 text-xl font-bold mb-3">{{ title }}</h2>
        <p class="text-gray-300">{{ message }}</p>
        <button (click)="close()" class="bg-yellow-400 text-black mt-4 px-4 py-2 rounded-lg hover:bg-yellow-500">
          {{ buttonText }}
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class SuccessModalComponent {
  @Input() title = '¡Éxito!';
  @Input() message = 'Operación realizada con éxito.';
  @Input() buttonText = 'Aceptar';
  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
}
