import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {
    transform(val: string, char: string) {
        return val.replace(char, ' ');
    }
}