import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'customFormatDate'})
export class CustomFormatDate implements PipeTransform {

    transform(value: string): string {
        return this.checkDate(value);
    }

    private checkDate(date: string): string {
        const currentDate = new Date();
        const check = new Date(date);

        const sameMonthYear = check.getMonth() === currentDate.getMonth() && check.getFullYear() === currentDate.getFullYear();

        // Today
        if (sameMonthYear && check.getDate() === currentDate.getDate()) {
            return 'Today at ' + check.getHours() + ':' + check.getMinutes();
        }

        if (sameMonthYear && check.getDate() === currentDate.getDate() + 1) {
            return 'Tomorrow at ' + check.getHours() + ':' + check.getMinutes();
        }

        return `${check.getFullYear()}/${check.getMonth()}/${check.getDate()} at ${check.getHours()}:${check.getMinutes()}`;
    }
}
