import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class CountService  {

    private indexSource = new BehaviorSubject(0);
    currentIndex = this.indexSource.asObservable();

    constructor() {  }

    changeIndex(index: number) {
        this.indexSource.next(index);
    }
    
}



  

