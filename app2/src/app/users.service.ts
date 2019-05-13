import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { URL } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 httpOptions =  new HttpHeaders({
      'Content-Type': 'application/json',
       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
       "Access-Control-Allow-Origin": "*",
       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })
  
URL:string ="http://localhost:4000/api/"
  constructor(
    private http:HttpClient,
  )
   {
console.log("aaaaaa",this.URL);
   }
   getLogin(user) {
    const URL = this.URL + 'signup';
    return this.http.post(URL, user,{headers:this.httpOptions});
  };

registration(userRegistration){ 
  const URL = this.URL + 'registration';
  console.log("aaaaaaa",URL);
    return this.http.post(URL, userRegistration,{headers:this.httpOptions});
};

getallusersdata(){
const URL = this.URL +'allRejisterData';
return this.http.get(URL,{headers:this.httpOptions})
};

getdatabyid(id){ 
  const URL = this.URL +'databyid/'+id;
  return this.http.get(URL,{headers:this.httpOptions}).toPromise();
}

putdatabyid(obj){ 
  const URL = this.URL +'databyid/'+obj.id;
  return this.http.put(URL,obj,{headers:this.httpOptions}).toPromise();
}

deletedata(obj){     
  const URL = this.URL +'removedata/'+obj;
  return this.http.delete(URL,{headers:this.httpOptions});
}

}
