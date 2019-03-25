import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../../serv/http-service';
@Injectable()
export class AllRfpsService {
    currentUser;
    constructor(private _http: HttpService, private _http5: Http) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    latestrfpecord(items, page) {
        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        return this._http.get('https://apis.rfpgurus.com/rf_p/latest/' + items + '?page=' + page,
            { headers: headers }).map((response: Response) => response.json());
    }
    latestrfps(items, page) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://apis.rfpgurus.com/rf_p/latest/' + items + '?page=' + page,
            { headers: headers }).map((response: Response) => response.json());
    }
    downloadFile(id) {
        let headers = new Headers();
        if (this.currentUser) {
            headers = new Headers({ 'Authorization': 'JWT ' + this.currentUser.token });
        }
        headers.append('Content-Type', 'application/json');
        return this._http5.get('https://apis.rfpgurus.com/rf_p/download_file/' + id + '/',
            { headers: headers }).map((response: Response) => response.json());
    }
    unsub_staterecord(state, items, page) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get('https://apis.rfpgurus.com/rf_p/unsub_std/' + state + '/' + items + '?page=' + page,
            { headers: headers }).map((response: Response) => response.json());
    }
    usersubscribe(username) {
        return this._http5.post('https://apis.rfpgurus.com/pkg_sub/', {
            'username': username
        }).map((res: Response) => res.json())
    }
    fiter_rfp(val,model,page) {
        if(model=='old'){
            return this._http5.post('https://apis.rfpgurus.com/rf_p/filterforAdmin/old'+ '?page=' + page, {
                'filter': val.toString()
            }).map((res: Response) => res.json())
        }else if(model=='new'){
            return this._http5.post('https://apis.rfpgurus.com/rf_p/filterforAdmin/new'+ '?page=' + page, {
                'filter': val.toString()
            }).map((res: Response) => res.json())
        }
       
    }
    update_rfp(id,rfp_number,rfpkey,title,descriptionTag,states,agency,date_entered,due_date,web_info,rfp_reference,category,subcat,seoTitleUrl,bid_type,agency_type,city_or_county,city,open_rfp,record_added,data_model,oldcat) {
        if(category){
            var cate =category.toString()
        }
        if(subcat){
            var subcat =subcat.toString()
        }
        var plainText = descriptionTag.replace(/<[^>]*>/g, '');
       
        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        if (data_model == false) {
            return this._http.put('https://apis.rfpgurus.com/rf_p/edit_rfp_old_table/' + id, JSON.stringify({
                "rfpkey": rfpkey,
                "rfp_number": rfp_number,
                "title": title,
                "record_added": record_added,
                "descriptionTag": descriptionTag,
                "state": states,
                "agency": agency,
                "date_entered": date_entered,
                "due_date": due_date,
                "web_info": web_info,
                "rfp_reference": rfp_reference,
                "new_category": cate,
                "sub_category": subcat,
                "seoTitleUrl": seoTitleUrl,
                "bid_type": bid_type,
                "agency_type": agency_type,
                "city_or_county": city_or_county,
                "city": city,
                "open_rfp": open_rfp,
                "category":oldcat,
                "deescription":plainText
            }),
                { headers: headers }).map((response: Response) => response.json());
        } else {
               return this._http.put('https://apis.rfpgurus.com/rf_p/edit_rfp_cleaning_table/' + id, JSON.stringify({
                    "rfpkey": rfpkey,
                    "rfp_number": rfp_number,
                    "title": title,
    
                    "descriptionTag": descriptionTag,
                    "state": states,
                    "agency": agency,
                    "date_entered": date_entered,
                    "due_date": due_date,
                    "web_info": web_info,
                    "rfp_reference": rfp_reference,
                    "new_category": cate,
                    "sub_category": subcat,
                    "seoTitleUrl": seoTitleUrl,
                    "bid_type": bid_type,
                    "agency_type": agency_type,
                    "city_or_county": city_or_county,
                    "city": city,
                    "open_rfp": open_rfp,
                    "category":oldcat,
                    "deescription":plainText
                }),
                    { headers: headers }).map((response: Response) => response.json());
        }

    }
    add_rfp(rfpkey,governmentbidsusers,title,descriptionTag,states,agency,date_entered,due_date,web_info,rfp_reference,category,subcat,seoTitleUrl,bid_type,agency_type,city_or_county,city,open_rfp,record_added,oldcat,url) {
if(category){
    var cate =category.toString()
}
if(subcat){
    var subcat =subcat.toString()
}
var plainText = descriptionTag.replace(/<[^>]*>/g, '');
        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://apis.rfpgurus.com/rf_p/add_rfp/', JSON.stringify({

            "rfpkey": rfpkey,
          "governmentbidsusers":governmentbidsusers,
            "title": title,
            "descriptionTag": descriptionTag,
            "state": states,
            "agency": agency,
            "date_entered": date_entered,
            "due_date": due_date,
            "web_info": web_info,
            "rfp_reference": rfp_reference,
            "new_category": cate,
            "sub_category": subcat,
            "seoTitleUrl": seoTitleUrl,
            "bid_type": bid_type,
            "agency_type": agency_type,
            "city_or_county": city_or_county,
            "city": city,
            "open_rfp": open_rfp,
            "record_added": record_added,
            "category":oldcat,
            "deescription":plainText,
            "profileurl":url
        }),
            { headers: headers }).map((response: Response) => response.json());
    }
    post_url(url){
        let headers = new Headers();
        if (localStorage.getItem('currentUser')) {
            headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('currentUser')).token });
        }
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://apis.rfpgurus.com/rf_p/addprofileurl/', JSON.stringify({
            "profile_url":url
          
        }),
            { headers: headers }).map((response: Response) => response.json());
    }
}