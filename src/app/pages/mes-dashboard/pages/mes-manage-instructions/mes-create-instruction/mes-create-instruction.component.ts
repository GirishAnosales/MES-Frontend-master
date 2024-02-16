import { Component } from '@angular/core';

@Component({
	selector: 'app-mes-create-instruction',
	templateUrl: './mes-create-instruction.component.html',
	styleUrls: ['./mes-create-instruction.component.scss']
})
export class MesCreateInstructionComponent {
	formattedValue: string = '';

	onInputChange(event: Event): void {
		const inputElement = event.target as HTMLInputElement;
		let inputValue = inputElement.value;

		// Remove non-numeric characters and hyphens
		inputValue = inputValue.replace(/[^\d-]/g, '');

		// Ensure the format is valid (e.g., "1-2-3-4")
		if (/^(\d+-?)+\d+$/.test(inputValue)) {
			this.formattedValue = inputValue;
		} else {
			// You can display an error message or take other actions for invalid input.
			// For example, you can clear the input field or show an error message.
			this.formattedValue = '';
		}
	}
}
