import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { NgbModal, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { WindowRefService } from '../../../window-ref.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    TranslateModule, CommonModule, NgbModule, NgbNavModule
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {

  constructor(private windowRef: WindowRefService) { }

  openLink(link: string) {
    console.log(link);
    this.openNewWindow(link);
  }

  openNewWindow(url: string) {
    this.windowRef.nativeWindow.open(url, '_blank');
  }

}

