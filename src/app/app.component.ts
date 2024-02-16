import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'MES';

	onClickScrollToTop() {
		window.scrollTo(0, 0);
	}

	onClickScrollToBottom() {
		window.scrollTo(0, document.body.scrollHeight,);
	}
}
