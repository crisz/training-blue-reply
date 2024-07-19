import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule, Store } from '@ngxs/store';
import { UserState } from '../../state/user.state';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [],
  providers: [Store],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    NgxsModule.forRoot([UserState]),
    NgxsSelectSnapshotModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class SharedModule { }