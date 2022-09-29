import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NombreCompletoPipe } from '../alumnos/pipes/nombre-completo.pipe';
import { ImageMissingDirective } from './directives/image-missing.directive';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NombreCompletoPipe,
    ImageMissingDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NombreCompletoPipe,
    ImageMissingDirective,
  ]
})
export class SharedModule { }
