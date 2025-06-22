import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabscannerService {

  private apiUrl: string = 'https://api.bill-spliiter.com';

  constructor(private http: HttpClient) { }

  processReceipt(receipt: File) {
    const formData = new FormData();
    formData.append('receipt', receipt);
    return this.http.post(`${this.apiUrl}/tabscanner/process`, formData);
  }



  getResult(token: string) {
    return this.http.get(`${this.apiUrl}/tabscanner/result/${token}`);
  }
}
