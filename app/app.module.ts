import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@NgModule({
  imports: [
     BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent
  ],
   providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


