import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
// import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxCarouselModule } from 'ngx-carousel';
import { ProgressHttpModule } from "angular-progress-http";
import { UsMapModule } from 'angular-us-map';
/////////////////////////////////Service/////////////////////////////
import { UnsubscribeService } from './unsubscribe/unsubscribe.service';
import { RfpService } from './rfps/single-rfp/rfp.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './registered/register.service';
import { SidebarService } from './user-sidebar/sidebar.service';
import { StateService } from './rfps/state-rfp/state.service';
import { CategoryRfpService } from './rfps/category-rfp/category-rfp.service';
import { HeaderService } from './header/header.service';
import { HomeService } from './home/home.service';
import { AdvanceService } from './advance-search/advance.service';
import { BlogService } from './blog/blog.service'
import { FooterService } from './footer/footer.service';
import { PaymentmethodsService } from './admin/paymentmethods/paymentmethods.service';
import { SpeechRecognitionService } from './header/speechservice';
import {SuperadminComponent} from './layouts/admin/superadmin.component'
import { MetaService } from './serv/meta_service';
/////////////////////////////////End////////////////////////////////
///////////////////for loader//////////////////////////////
import { BaseRequestOptions } from '@angular/http';
import { PreloaderService } from './serv/preloader-service';
import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from './serv/http-service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthGuard1 } from './_guards/auth.guard1';
import { AuthLogin } from './_guards/auth.login';

import { RecapchaService } from './recapcha/recapcha.service';
import { ResultsService } from './results/results.service';
import { AgencyService } from './rfps/agency-rfp/agency.service';
import { SharedData } from './shared-service'

//////////////////////////////////////////////////////////End//////////////////////////////////////////////
import 'hammerjs';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    DateAdapter, MatNativeDateModule

} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SingleRfpComponent } from './rfps/single-rfp/single-rfp.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminLayoutComponent } from './layouts/lyout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AdminComponent } from './layouts/superadmin/admin-layout.component'
import { SidebarComponent } from './sidebar/sidebar.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { EditRfpComponent } from './edit-rfp/edit-rfp.component';

import { SlickModule } from 'ngx-slick';
import { TextMaskModule } from 'angular2-text-mask';
import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe } from '@angular/common';
import { RecapchaModule } from './recapcha/recapcha.module';
import { AppRoutingModule } from './app-routing.module';

////////////////////////for loader/////////////////////////
export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
    return new HttpService(backend, defaultOptions, preloaderService);
}
////////////////////////end///////////////////////
//////////////////////////// Live Chat ////////////////////////////

/////////////////////////// End //////////////////////////////////
/////////////////////////Social login//////////////////////////////
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { LoaderModule } from './loader/loader.module';
let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("210115018603-187b6essbhk7booo33ab36d1u8cn3jpp.apps.googleusercontent.com")
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("692540294438102")
    }
]);
export function provideConfig() {
    return config;
}

///////////////////////// END ////////////////////////////////////

@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule, MatNativeDateModule,
        
    ],
    
  
  
})
export class MaterialModule { }
@NgModule({
    imports: [
        
        CommonModule,SlickModule,
        UsMapModule,
        BrowserAnimationsModule,
        FormsModule,
        TextMaskModule, AppRoutingModule,

        HttpModule,
        MaterialModule,
        ProgressHttpModule,
        Ng2SearchPipeModule,
        NgxCarouselModule,CKEditorModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDPnJ0zatoiPOI1GOeeS7HCj7AxIW183tg'
        }),
        ReactiveFormsModule,
        SocialLoginModule,
        LoaderModule,
        RecapchaModule
    ],
    declarations: [
        AdminComponent,
        EditRfpComponent,
        SuperadminComponent,
        SidebarComponent,
        AppComponent,
        AuthLayoutComponent,
        AdminLayoutComponent,
        HomeComponent,
        HeaderComponent,
        SingleRfpComponent,
        UserSidebarComponent,
        FooterComponent,
        WatchlistComponent
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        DatePipe,
      
        RecapchaService,
        SharedData,
        AdvanceService,
        HomeService,
        HeaderService,
        
        CategoryRfpService,
        StateService,
        RfpService,
        SidebarService,
        LoginService,MetaService,
        
        RegisterService,
       
        PreloaderService,
        
        AuthGuard,AuthGuard1,AuthLogin,
        BaseRequestOptions,
       
        FooterService,
        ResultsService,
       
        AgencyService,
        BlogService,
      
        SpeechRecognitionService,
        PaymentmethodsService, UnsubscribeService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, PreloaderService]
        },
    ],
    bootstrap: [AppComponent],
    entryComponents:[EditRfpComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale('en-us'); // DD/MM/YYYY
      }
    
}
