import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'noHtml' })
export class noHtmlPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/<[^>]*>/g, '');
    }
}