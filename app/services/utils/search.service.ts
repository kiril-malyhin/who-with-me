import {Injectable} from '@angular/core';

@Injectable()
export class SearchService {

    static setParameters(destinationFrom: string, destinationTo: string, destinationDate: any) {
        localStorage.setItem('destinationFrom', destinationFrom);
        localStorage.setItem('destinationTo', destinationTo);
        localStorage.setItem('destinationDate', destinationDate);
    }

    static getParameters(): {destinationFrom: string, destinationTo: string, destinationDate: any} {
        let destinationFrom = localStorage.getItem('destinationFrom');
        let destinationTo = localStorage.getItem('destinationTo');
        let destinationDate = localStorage.getItem('destinationDate');
        return {destinationFrom, destinationTo, destinationDate};
    }
}
