import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LanguageService {

    static getLanguage(): string {
        return localStorage.getItem('language') || 'en';
    }

    static setLanguage(language: string): void {
        localStorage.setItem('language', language);
    }
}
