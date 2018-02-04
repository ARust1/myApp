import { NgModule } from '@angular/core';
import { AutosizeDirective } from './autosize/autosize';
import { GoogleDirective } from './google/google';

@NgModule({
	declarations: [AutosizeDirective,
    GoogleDirective],
	imports: [],
	exports: [AutosizeDirective,
    GoogleDirective]
})
export class DirectivesModule {}
