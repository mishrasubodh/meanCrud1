import { Directive ,ElementRef} from '@angular/core';

@Directive({
  selector: '[appBlue]'
})
export class BlueDirective {

  constructor(private el:ElementRef) { 
    el.nativeElement.style.backgroundColor="lightgray";
    //console.log("eee",el)
    console.log("eee",el.nativeElement)
  }

}
