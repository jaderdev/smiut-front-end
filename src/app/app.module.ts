import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/_services/auth.service';

// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';

import { FormsModule } from '@angular/forms';
import { GalleryModule } from './pages/components/gallery/gallery.module';
import { EmpresasService } from './services/empresas/empresas.service';
import { NgxGaugeModule } from 'ngx-gauge';

function appInitializer(authService: AuthService, empresasService: EmpresasService) {
	return async () => {
		let Promises: any = [
			empresasService.getEmpresasNameForMenu(),
			authService.getUserByToken()
		];
		const response = await Promise.all(Promises);
		if(!response[0]){
			authService.logout();
		}
	};
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		SplashScreenModule,
		TranslateModule.forRoot(),
		HttpClientModule,
		HighlightModule,
		ClipboardModule,
		FormsModule,
		GalleryModule,
		AppRoutingModule,
		InlineSVGModule.forRoot(),
		NgbModule,
		NgxGaugeModule,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializer,
			multi: true,
			deps: [AuthService, EmpresasService],
		},

		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: {
				coreLibraryLoader: () => import('highlight.js/lib/core'),
				languages: {
					xml: () => import('highlight.js/lib/languages/xml'),
					typescript: () => import('highlight.js/lib/languages/typescript'),
					scss: () => import('highlight.js/lib/languages/scss'),
					json: () => import('highlight.js/lib/languages/json')
				},
			},
		},
	],

	bootstrap: [AppComponent],
})
export class AppModule {
}
