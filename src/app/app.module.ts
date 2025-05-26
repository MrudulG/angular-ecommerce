import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from  '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {LegacyPageEvent as PageEvent, MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import { ProductService } from './service/product.service';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatIconModule} from '@angular/material/icon';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field/form-field-module';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({ declarations: [
        AppComponent,
        ProductListComponent,
        MenuListComponent,
        SearchBarComponent,
        ProductDetailsComponent,
        CartStatusComponent,
        CartDetailComponent,
        CheckoutComponent,
        LoginComponent,
        LoginStatusComponent,
        OrderHistoryComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule,
        OktaAuthModule,
        FormsModule], providers: [ProductService,
        { provide: OKTA_CONFIG, useValue: { oktaAuth } },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        {
            provide: MatDialogRef,
            useValue: {}
        }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
