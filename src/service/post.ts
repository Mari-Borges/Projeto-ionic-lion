/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class Post {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    server: string = 'http://localhost/apiionic/';



    constructor(private http: HttpClient){
    }

    dadosApi(dados: any, api: string){
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type' : 'application/json'})
            };

        let url = this.server + api;
        return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
    }
}
