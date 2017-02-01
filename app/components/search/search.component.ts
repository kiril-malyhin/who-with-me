import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'search.component.html',
    styleUrls: [ 'search.component.css' ]
})

export class SearchComponent {
    myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        disableUntil: {
            year: 2016,
            month: 8,
            day: 10
        },
        selectionTxtFontSize: '14px'
    };

    value: Date;

    onDateChanged(event:any) {
        console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    }
}