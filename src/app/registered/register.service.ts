import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';

import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';

@Injectable()
export class RegisterService {

constructor(private _http5: HttpService,private _http1: Http ) {}

loaded:boolean =false;
login(username: string, password: string) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return this._http5.post('https://apis.rfpgurus.com/user-token-auth/',
    JSON.stringify({username: username, password: password }), {headers: headers})
    .map((response: Response) => {
      let user =  { username: username, token: response.json().token};

      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log (localStorage.getItem('currentUser'))
      }
    });
}

email_exist(email){
    return this._http1.post('https://apis.rfpgurus.com/email_exist/',{
        'email':email
    }).map((res: Response) => res.json() )
}
username_exist(username){
    return this._http1.post('https://apis.rfpgurus.com/user_name_exist/',{
        'username':username
    }).map((res: Response) => res.json() )
}
login_authenticate(username){
    return this._http5.post('https://apis.rfpgurus.com/ac_login/',{
        'username':username
    }).map((res: Response) => res.json() ) 
}
post_service(obj)
{
return this._http5.post("https://apis.rfpgurus.com/register/",{
    'obj':obj
}).map((res: Response) => res.json());

}
activation_service(email){
    return this._http5.post("https://apis.rfpgurus.com/ac_code/",{
        'email':email
    }).map((res: Response) => res.json() ) 
}

authenticate_service(uid) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http5.get('https://apis.rfpgurus.com/activate/'+uid,
    {headers: headers}).map((response: Response) => response.json());

}

zipcode(zip) {
    
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http1.get('https://apis.rfpgurus.com/zipcode/'+zip+'/',
        {headers: headers}).map((response: Response) => response.json());
    
    }

forget_password(email){
   
    return this._http5.post('https://apis.rfpgurus.com/forget_password/',{
        'email':email
    }).map((res: Response) => res.json() ) 
    
    
}
change_password(pass1,pass2,code){
    return this._http5.post('https://apis.rfpgurus.com/change_password/',{
        'pass1':pass1,
        'pass2':pass2,
        'code':code,
    }).map((res: Response) => res.json() ) 
}


package_free(username,pkgdetail)
{
    if(pkgdetail.type == 'F') {
        return this._http5.post("https://apis.rfpgurus.com/package/",{            
            'username': username,  
            'pricepackage': pkgdetail.type,
            'duaration': pkgdetail.dur     
        }).map((res: Response) => res.json())
    }
    else{
        return this._http5.post("https://apis.rfpgurus.com/package/",{            
            'username': username,  
            'pricepackage': pkgdetail.type,
            'duration': pkgdetail.dur,
            'creditno': pkgdetail.credit ,
            'exp':pkgdetail.expdate,
            'ccv':pkgdetail.ccv     
        }).map((res: Response) => res.json())
        
    }

}
}