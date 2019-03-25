import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxCarouselModule } from 'ngx-carousel';
import { ProgressHttpModule } from "angular-progress-http";
import { UsMapModule } from 'angular-us-map';
import { InternationalPhoneModule } from 'ng4-intl-phone';
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
import { RecapchaService } from './recapcha/recapcha.service';
import { ResultsService } from './results/results.service';
import { AgencyService } from './rfps/agency-rfp/agency.service';
import { SharedData } from './shared-service'

//////////////////////////////////////////////////////////End//////////////////////////////////////////////
import 'hammerjs';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    DateAdapter,

} from '@angular/material';

import { AppComponent } from './app.component';
import { AllnotificationComponent } from './allnotification/allnotification.component';
import { AppRoutes } from './app.routing';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SingleRfpComponent } from './rfps/single-rfp/single-rfp.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { RfpComponent } from './rfps/rfp/rfp.component';
import { RegisteredComponent } from './registered/registered.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoginComponent } from './login/login.component';
import { SuperloginComponent } from './superlogin/superlogin.component';
import { DialogOverviewExample } from './residential/residential.component';
import { FooterComponent } from './footer/footer.component';
import { RecapchaComponent } from './recapcha/recapcha.component';
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

        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        // BlackgeeksRecaptchaModule
    ],
    
  
  
})
export class MaterialModule { }
@NgModule({
    imports: [
        InternationalPhoneModule,
        CommonModule,SlickModule,
        UsMapModule,
        BrowserAnimationsModule,
        FormsModule,
        TextMaskModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        MaterialModule,
        MatNativeDateModule,
        ProgressHttpModule,
        Ng2SearchPipeModule,
        NgxCarouselModule,CKEditorModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDPnJ0zatoiPOI1GOeeS7HCj7AxIW183tg'
        }),
        ReactiveFormsModule,
        // RecaptchaModule.forRoot(),
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        SocialLoginModule,
        LoaderModule,
    ],
    declarations: [
        AdminComponent,SuperloginComponent,EditRfpComponent,
        SuperadminComponent,
        // UnsubscribeComponent,
        AllnotificationComponent,
        // PaymentmethodsComponent,
        SidebarComponent,
        AppComponent,
        AuthLayoutComponent,
        AdminLayoutComponent,
        HomeComponent,
        HeaderComponent,
        SingleRfpComponent,
        UserSidebarComponent,
        RecapchaComponent,
        // PricingComponent,
        RfpComponent,
        // PreloaderFull,
        // PreloaderSmall,
        // LoaderComponent,
        RegisteredComponent,
        AuthenticateComponent,
        LoginComponent,
        // ForgetPasswordComponent,
        // RecaptchaComponent,
        // StateRfpComponent,
        // CategoryRfpComponent,
        // AllCategoryComponent,
        // AllStateComponent,
        DialogOverviewExample,
        // ProfileComponent,
        // AllRfpsComponent,
        FooterComponent,
        // ChangedPasswordComponent,
        // AdvanceSearchComponent,
        // BlogComponent,
        // BlogComponent,
        // SingleblogComponent,
        // PartnershipComponent,
        // BaseComponent,
        // ResultsComponent,
        // HistoryComponent,
        // AllAgenciesComponent,
        // AgencyRfpComponent,
        WatchlistComponent
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        DatePipe,
        // MainService,
        // AllStateService,
        RecapchaService,
        SharedData,
        AdvanceService,
        HomeService,
        HeaderService,
        // ChangedPasswordService,
        // AllCategoryService,
        CategoryRfpService,
        StateService,
        RfpService,
        SidebarService,
        LoginService,MetaService,
        // PricingService,
        RegisterService,
        // AllRfpsService,
        // ForgetPasswordService,
        PreloaderService,
        // PagerService,
        AuthGuard,AuthGuard1,
        BaseRequestOptions,
        // ProfileService,
        // ContactUsService,
        FooterService,
        ResultsService,
        // AllAgenciesService,
        AgencyService,
        BlogService,
        // partnershipservice,
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
