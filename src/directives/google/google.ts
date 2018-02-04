import { Directive } from '@angular/core';
import { Input, Output, HostListener } from '@angular/core/src/metadata/directives';

/**
 * Generated class for the GoogleDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: 'google' // Attribute selector
})
export class GoogleDirective {
  @Output() options = ('options');
  @Input() FormatAddress = ('getFormattedAddress($event)');

  constructor() {
    console.log('Hello GoogleDirective Directive');
  }

}
