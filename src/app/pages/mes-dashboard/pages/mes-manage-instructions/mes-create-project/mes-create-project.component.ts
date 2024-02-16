import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-mes-create-project',
	templateUrl: './mes-create-project.component.html',
	styleUrls: ['./mes-create-project.component.scss']
})
export class MesCreateProjectComponent {
	projectName!: string;
	formattedValue: string = '';

	constructor(
		private activatedRoute: ActivatedRoute,
	) { }

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe(params => {
			this.projectName = params.get('projectName')!;
			console.log("ProjectName from mes-create-project: ", this.projectName);
		});
	}

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
