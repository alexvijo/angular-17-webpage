
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, NgbModule, NgbNavModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

  trackByFn(index: any, item: { id: any; }) {
    return item.id; // unique id corresponding to the item
  }

}
