import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaymentmethodsComponent } from './admin/paymentmethods/paymentmethods.component';
import { AllnotificationComponent } from './allnotification/allnotification.component';
import {Page404Component} from './page404/page404.component'
import { SingleRfpComponent } from './rfps/single-rfp/single-rfp.component';
import { PricingComponent } from './pricing/pricing.component';
// import {SidebarComponent} from "./sidebar/sidebar.component";
import { RfpComponent } from './rfps/rfp/rfp.component';
import { RegisteredComponent } from './registered/registered.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoginComponent } from './login/login.component';

import { DialogOverviewExample } from './residential/residential.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthGuard1 } from './_guards/auth.guard1';

import { AdminLayoutComponent } from './layouts/lyout/admin-layout.component';
import { AdminComponent } from './layouts/superadmin/admin-layout.component'
import { WatchlistComponent } from './watchlist/watchlist.component';
import {SuperadminComponent} from './layouts/admin/superadmin.component'

import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SuperloginComponent } from './superlogin/superlogin.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    },
    
    { path: '', component: HomeComponent },
    {
        path: 'activateaccount/:query1',
        component: AuthenticateComponent
    },
    { path: 'page-not-found', loadChildren: '../app/page404/page404.module#Page404Module' },

    {
        path: '',
        component: AdminComponent,
        children: [
            // { path: 'purchase-history', component: HistoryComponent, canActivate: [AuthGuard] },
            { path: 'purchase-history', loadChildren: '../app/admin/history/history.module#HistoryModule',canActivate: [AuthGuard] },
            // { path: 'change-password', component: ChangedPasswordComponent, canActivate: [AuthGuard] },
            { path: 'Preferences', loadChildren: '../app/admin/Preferences/profile.module#ProfileModule', canActivate: [AuthGuard] },

            { path: 'change-password', loadChildren: '../app/admin/changed-password/changed-password.module#ChangedPasswordModule',canActivate: [AuthGuard] },
                    // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'profile', loadChildren: '../app/admin/profile/profile.module#ProfileModule',canActivate: [AuthGuard] },
            // { path: 'payment', component: PaymentmethodsComponent, canActivate: [AuthGuard] },
            { path: 'payment', loadChildren: '../app/admin/paymentmethods/paymentmethods.module#PaymentmethodsModule',canActivate: [AuthGuard] },
            { path: 'notifications', component: AllnotificationComponent ,canActivate: [AuthGuard]},
            { path: 'my-watchlist', component: WatchlistComponent,canActivate: [AuthGuard] },
        ]
            
    },



    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            // { path: 'find-bids', component: BaseComponent },
            { path: 'find-rfp', loadChildren: '../app/base/base.module#BaseModule', data: {
                title: 'find-rfp'
              } },

            // { path: 'watchlist', component: WatchlistComponent },
            // { path: 'watchlist', loadChildren: '../app/watchlist/watchlist.module#WatchlistModule' },
            // { path: 'find-bids',component:RfpComponent},
            { path: 'rfp', component: SingleRfpComponent },
            // { path: 'rfp/:query', loadChildren: '../app/rfps/single-rfp/single-rfp.module#SingleRfpModule'},
            
            { path: 'searched-data', loadChildren: '../app/results/results.module#ResultsModule' },
            // { path: 'searched-data', loadChildren: '../app/rfps/single-rfp/single-rfp.module#SingleRfpModule'},
            // { path: 'latest-rfp', component: AllRfpsComponent },
     { path: 'latest-rfp', loadChildren: '../app/all/all-rfps/all-rfps.module#AllRfpsModule' },
   
            // { path: 'category', component: CategoryRfpComponent },
            { path: 'category', loadChildren: '../app/rfps/category-rfp/category-rfp.module#CategoryRfpModule'},
            { path: 'subcategory', loadChildren: '../app/rfps/subcategory-rfp/subcategory-rfp.module#SubCategoryRfpModule'},
            // { path: 'state', component: StateRfpComponent },
            { path: 'state', loadChildren: '../app/rfps/state-rfp/state-rfp.module#StateRfpModule'},
           
            // { path: 'agency', component: AgencyRfpComponent },
            { path: 'agency', loadChildren: '../app/rfps/agency-rfp/agency-rfp.module#AgencyRfpModule'},
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'adminlogin',
                component: SuperloginComponent
              },
            // { path: 'unsubscribe/:query1', component: UnsubscribeComponent },
            { path: 'unsubscribe/:query1', loadChildren: '../app/unsubscribe/unsubscribe.module#UnsubscribeModule' },
            // { path: 'login', loadChildren: '../app/login/login.module#LoginModule' },
            { path: 'login', component: LoginComponent },
            // { path: 'rfp-as-service', component: RfpAsServiceComponent },
            { path: 'rfp-as-service', loadChildren: '../app/rfp-as-service/rfp-as-service.module#RfpAsServiceModule' },
            { path: 'blog', loadChildren: '../app/blog/blog.module#BlogModule' },
            // { path: 'blog', component: BlogComponent },
            // { path: 'All-notifications', component: AllnotificationComponent },
            // { path: 'All-notifications', loadChildren: '../app/allnotification/allnotification.module#AllnotificationModule' },
        
            // { path: 'single-blog', component: SingleblogComponent },
              { path: 'single-blog', loadChildren: '../app/singleblog/singleblog.module#SingleblogModule' },
            { path: 'how-it-works', loadChildren: '../app/how-it-works/how-it-work.module#HowItWorksModule' },
            { path: 'what-is-rfp', loadChildren: '../app/what-is-rfp/what-is-rfp.module#WhatIsRfpModule' },
            { path: 'features-comparison', loadChildren: './features-comparison/features-comparison.module#FeaturesComparisonModule' },
            { path: 'terms', loadChildren: '../app/terms/terms.module#TermsModule' },
            { path: 'privacy-policy', loadChildren: '../app/privacy-policy/privacy-policy.module#PrivacyPolicyModule' },
            // { path: 'partnership', component: PartnershipComponent },
            { path: 'partnership', loadChildren: '../app/partnership/partnership.module#PartnershipModule'},
            { path: 'why-rfpgurus', loadChildren: '../app/why-rfpgurus/why-rfpgurus.module#WhyRfpgurusModule' },
            { path: 'our-team', loadChildren: '../app/our-team/our-team.module#OurTeamModule' },
            { path: 'what-we-do', loadChildren: '../app/what-we-do/what-we-do.module#WhatWeDoModule' },
            // { path: 'pricing', component: PricingComponent },
            { path: 'pricing', loadChildren: '../app/pricing/pricing.module#PricingModule'},
            { path: 'who-are-we', loadChildren: '../app/about/about.module#AboutModule' },

            { path: 'sign-up', component: RegisteredComponent },
            // { path: 'sign-up', loadChildren: '../app/registered/registered.module#RegisteredModule' },
            
            // { path: 'all-category', component: AllCategoryComponent },
            { path: 'all-category', loadChildren: '../app/all/all-category/all-category.module#AllCategoryModule' },
            // { path: 'all-agencies', component: AllAgenciesComponent },
            { path: 'all-agencies', loadChildren: '../app/all/all-agencies/all-agencies.module#AllAgenciesModule' },
            // { path: 'all-state', component: AllStateComponent },
            { path: 'all-state', loadChildren: '../app/all/all-state/all-state.module#AllStateModule' },
            { path: 'faqs', component: DialogOverviewExample },
            // { path: 'faqs', loadChildren: '../app/residential/residential.module#DialogOverviewModule' },
            { path: 'contact-us', loadChildren: '../app/contact-us/contact-us.module#ContactUsModule' },
            // { path: 'advanced-search', component: AdvanceSearchComponent },
 { path: 'advanced-search', loadChildren: '../app/advance-search/advance-search.module#AdvanceSearchModule' },

            // { path: 'forgetpassword/:query2', component: ForgetPasswordComponent},
            { path: 'forgetpassword/:query2', loadChildren: '../app/admin/forget-password/forget-password.module#ForgetPasswordModule' },
            // { path: '**', loadChildren: '../app/page404/page404.module#Page404Module' },
        ]
    },

    {
        path: '',
        component: SuperadminComponent,
        children: [
            
            { path: 'admin-panel', loadChildren: '../app/admin-penal/admin-penal.module#AdminPenalModule' ,canActivate: [AuthGuard1]},
            { path: 'add-rfp', loadChildren: '../app/add-rfp/add-rfp.module#AddRfpModule' ,canActivate: [AuthGuard1]},
            { path: 'watchlist', component: WatchlistComponent,canActivate: [AuthGuard1] },
            { path: 'log-detail', loadChildren: '../app/log-detail/log-detail.module#LogDetailModule' ,canActivate: [AuthGuard1]},
        ]
    },
    { path: '**', loadChildren: '../app/page404/page404.module#Page404Module' }
];