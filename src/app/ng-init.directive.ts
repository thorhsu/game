import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appNgInit]'
})
export class NgInitDirective {

  constructor() { }
  @Output('appNgInit') initEvent: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.initEvent.emit();
  }

}
