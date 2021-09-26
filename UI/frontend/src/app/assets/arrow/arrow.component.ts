import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css']
})
export class ArrowComponent implements OnInit {

  constructor() { }

  @Input() arrowType: boolean = false;

  ngOnInit(): void {
  }

}
