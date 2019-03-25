import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SharedData {
  currentProducts;
  categorySubject = new BehaviorSubject<any>('');
  stateSubject = new BehaviorSubject<any>('');
  agencySubject =new BehaviorSubject<any>('');
  searchSubject = new BehaviorSubject<any>('');
  watchSubject=new BehaviorSubject<any>('');
  currentMessage = this.watchSubject.asObservable();
  update=new Subject<any>();
  updated_data = this.update.asObservable();
  notiSubject=new BehaviorSubject<any>('');
  notification = this.notiSubject.asObservable();
  unreadnotiSubject=new BehaviorSubject<any>('');
  unreadnotification = this.unreadnotiSubject.asObservable();
  watchtotalSubject=new BehaviorSubject<any>('');
  currentMessagetotal = this.watchtotalSubject.asObservable();

  constructor() {
 
  }
  updateInfo(message) {
    this.update.next(message)
    console.log(message)
  }
  notifyInfo(message) {
    this.notiSubject.next(message)
  }
  unreadnotifyInfo(message) {
    this.unreadnotiSubject.next(message)
  }
  
  watchtotal(message) {
    this.watchtotalSubject.next(message)
    console.log( message)

  }
  watchInfo(message) {
    this.watchSubject.next(message)
    console.log( message)
  }
  returnCategory(){
    return this.categorySubject;
  }
  
  categoryInfo(data){
    this.categorySubject.next(data);
  }

    returnCat(){
        return this.categorySubject;
    }

    catInfo(data){
        this.categorySubject.next(data);
    }
  //   returnwatch(){
  //     return this.watchSubject;
  // }

  // watchInfo(data){
  //     this.watchSubject.next(data);
  // }
  returnState(){
return this.stateSubject;
  }
  
  stateInfo(path){
  this.stateSubject.next(path)

  }

  returnSearch(){
    return this.searchSubject;
      }
  searchInfo(data){
      this.searchSubject.next(data)
    
  }

    agencyInfo(path){
        this.agencySubject.next(path)

    }
    returnagency(){
        return this.agencySubject;
    }

}