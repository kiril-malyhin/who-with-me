import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'search.component.html',
    styleUrls: [ 'search.component.css' ]
})

export class SearchComponent {
    title: string;
    registration: string;
    enter: string;

    constructor(private router: Router) {
        this.title = 'Кто со мной?';
        this.registration = "Регистрация";
        this.enter = "Войти";
    }

    myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: false,
        disableUntil: {year: 2016, month: 8, day: 10},
        selectionTxtFontSize: '16px'
    };

    onDateChanged(event:any) {
        console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    }

    goToLogin(): void {
        this.router.navigate(['/login']);
    }
}