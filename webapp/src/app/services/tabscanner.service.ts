import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabscannerService {

  private apiUrl: string = 'http://localhost:8080';
  // private apiVersion: string = '2';
  // private apiKey = 'xz9G0OBXUzsE5BKeN6pF0zG7KNHGtGBn87ORDLVJ19f1j98Qx0CDYaySfQ7Zx35l';

  constructor(private http: HttpClient) { }

  processReceipt(receipt: File) {
    // const headers = new HttpHeaders({ 'apikey': this.apiKey });
    const formData = new FormData();
    formData.append('receipt', receipt);
    return this.http.post(`${this.apiUrl}/tabscanner/process`, formData);

    // return of({ status: 'success' })
  }



  getResult(token: string) {
    // const headers = new HttpHeaders({ 'apikey': this.apiKey });
    return this.http.get(`${this.apiUrl}/tabscanner/result/${token}`);

//     return of ({
//     "message": "SUCCESS: Result available",
//     "status": "done",
//     "status_code": 3,
//     "result": {
//         "establishment": "2 2.TORO",
//         "validatedEstablishment": false,
//         "date": "",
//         "total": 8.99,
//         "url": "",
//         "phoneNumber": "",
//         "paymentMethod": "",
//         "address": "",
//         "cash": 0,
//         "change": 0,
//         "validatedTotal": false,
//         "subTotal": 0,
//         "validatedSubTotal": false,
//         "tax": 0,
//         "tip": 0,
//         "taxes": [],
//         "serviceCharges": [],
//         "discount": 0,
//         "rounding": 0,
//         "discounts": [],
//         "lineItems": [
//             {
//                 "qty": 0,
//                 "desc": "2",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$",
//                     "E"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "",
//                 "lineTotal": 29.9,
//                 "productCode": "",
//                 "customFields": {}
//             },
//             {
//                 "qty": 0,
//                 "desc": "3.HAMACHI",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "3.HAMACHI",
//                 "lineTotal": 11.9,
//                 "productCode": "",
//                 "customFields": {}
//             },
//             {
//                 "qty": 3,
//                 "desc": "3 9.UNAGI",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "9.UNAGI",
//                 "lineTotal": 17.85,
//                 "productCode": "",
//                 "customFields": {}
//             },
//             {
//                 "qty": 1,
//                 "desc": "1 12.WHITE TUNA",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "12.WHITE TUNA",
//                 "lineTotal": 5.99,
//                 "productCode": "",
//                 "customFields": {}
//             },
//             {
//                 "qty": 1,
//                 "desc": "1 29.SPICY YELLOW TAIL",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "29.SPICY YELLOW TAIL",
//                 "lineTotal": 6.5,
//                 "productCode": "",
//                 "customFields": {},
//                 "supplementaryLineItems": {
//                     "above": [],
//                     "below": [
//                         {
//                             "qty": 0,
//                             "desc": "ROLL",
//                             "unit": "",
//                             "price": 0,
//                             "symbols": [],
//                             "discount": 0,
//                             "lineType": "",
//                             "descClean": "ROLL",
//                             "lineTotal": 0,
//                             "confidence": 0.5,
//                             "productCode": "",
//                             "customFields": {}
//                         }
//                     ]
//                 }
//             },
//             {
//                 "qty": 1,
//                 "desc": "1 61.KABUKI ROLL",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "61.KABUKI ROLL",
//                 "lineTotal": 8.95,
//                 "productCode": "",
//                 "customFields": {},
//                 "supplementaryLineItems": {
//                     "above": [
//                         {
//                             "qty": 0,
//                             "desc": "ROLL",
//                             "unit": "",
//                             "price": 0,
//                             "symbols": [],
//                             "discount": 0,
//                             "lineType": "",
//                             "descClean": "ROLL",
//                             "lineTotal": 0,
//                             "confidence": 0.5,
//                             "productCode": "",
//                             "customFields": {}
//                         }
//                     ],
//                     "below": []
//                 }
//             },
//             {
//                 "qty": 2,
//                 "desc": "2 63.DRAGON ROLL",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "63.DRAGON ROLL",
//                 "lineTotal": 33.9,
//                 "productCode": "",
//                 "customFields": {}
//             },
//             {
//                 "qty": 1,
//                 "desc": "1 KAMIKAZE",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "KAMIKAZE",
//                 "lineTotal": 9.95,
//                 "productCode": "",
//                 "customFields": {}
//             },
//             {
//                 "qty": 1,
//                 "desc": "1 ALLIGATOR",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "ALLIGATOR",
//                 "lineTotal": 14.95,
//                 "productCode": "",
//                 "customFields": {}
//             },
//             {
//                 "qty": 1,
//                 "desc": "1 ONIGOROSHI HONJOZO",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "ONIGOROSHI HONJOZO",
//                 "lineTotal": 8.5,
//                 "productCode": "",
//                 "customFields": {}
//             },
//             {
//                 "qty": 1,
//                 "desc": "1 OYSTER BAY SAUVIGNON",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "$"
//                 ],
//                 "discount": 0,
//                 "lineType": "",
//                 "descClean": "OYSTER BAY SAUVIGNON",
//                 "lineTotal": 8.99,
//                 "productCode": "",
//                 "customFields": {},
//                 "supplementaryLineItems": {
//                     "above": [],
//                     "below": [
//                         {
//                             "qty": 0,
//                             "desc": "BLANC",
//                             "unit": "",
//                             "price": 0,
//                             "symbols": [],
//                             "discount": 0,
//                             "lineType": "",
//                             "descClean": "BLANC",
//                             "lineTotal": 0,
//                             "confidence": 0.5,
//                             "productCode": "",
//                             "customFields": {}
//                         }
//                     ]
//                 }
//             },
//             {
//                 "qty": 0,
//                 "desc": "GLASS",
//                 "unit": "",
//                 "price": 0,
//                 "symbols": [
//                     "(",
//                     "$",
//                     ")"
//                 ],
//                 "discount": 0,
//                 "lineType": "Total",
//                 "descClean": "GLASS",
//                 "lineTotal": 8.99,
//                 "productCode": "",
//                 "customFields": {},
//                 "supplementaryLineItems": {
//                     "above": [
//                         {
//                             "qty": 0,
//                             "desc": "BLANC",
//                             "unit": "",
//                             "price": 0,
//                             "symbols": [],
//                             "discount": 0,
//                             "lineType": "",
//                             "descClean": "BLANC",
//                             "lineTotal": 0,
//                             "confidence": 0.5,
//                             "productCode": "",
//                             "customFields": {}
//                         }
//                     ],
//                     "below": []
//                 }
//             }
//         ],
//         "summaryItems": [],
//         "subTotalConfidence": 0,
//         "taxesConfidence": [],
//         "serviceChargeConfidences": [],
//         "discountConfidences": [],
//         "totalConfidence": 0.5,
//         "dateConfidence": 0,
//         "establishmentConfidence": 0.8,
//         "tipConfidence": 0,
//         "cashConfidence": 0,
//         "changeConfidence": 0,
//         "roundingConfidence": 0,
//         "customFields": {
//             "URL": "",
//             "Country": "",
//             "StoreID": "",
//             "Currency": "",
//             "VATNumber": "",
//             "ExpenseType": "",
//             "PaymentMethod": "",
//             "CardLast4Digits": ""
//         },
//         "documentType": "receipt",
//         "currency": "",
//         "barcodes": [],
//         "addressNorm": {
//             "city": "",
//             "state": "",
//             "number": "",
//             "street": "",
//             "suburb": "",
//             "country": "",
//             "building": "",
//             "postcode": ""
//         },
//         "expenseType": "None",
//         "otherData": []
//     },
//     "success": true,
//     "code": 202
// })
  }
}
