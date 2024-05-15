import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule
  ],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss',
  animations:[
    trigger("archiveAnimation", [
      transition(":enter", [
        query("*", [
          style({opacity: 0, transform: "translateY(100%)"}),
          stagger(15, [
            animate(
              "500ms cubic-bezier(0.35, 0, 0.25, 1)",
              style({opacity: 1, transform: "none"}))
            ])
          ])
        ])
      ])
    ]
})
export class ArchiveComponent implements OnInit, AfterViewInit {

  public state: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
        this.state=true;
    }, 1);
  }

}
