import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TabscannerService {

  private apiUrl: string = `${environment.webserviceBaseUrl}/tabscanner`;

  constructor(private http: HttpClient) { }

  processReceipt(receipt: File) {
    const formData = new FormData();
    formData.append('receipt', receipt);
    return this.http.post(`${this.apiUrl}/process`, formData);
  }



  getResult(token: string) {
    return this.http.get(`${this.apiUrl}/result/${token}`);
  }
}
