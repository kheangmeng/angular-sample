import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { mapPayments, mapPayment } from "./mapping";
import type { Pagination, PaymentResponse, Payment } from "../../types";

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  onPayment(payment: Payment): Observable<PaymentResponse> {
    return this.http
      .post<PaymentResponse>(`${this.apiUrl}/api/payments`, payment, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        map(mapPayment)
      )
  }

  getPayments(pagination: Pagination): Observable<PaymentResponse[]> {
    return this.http
      .get<PaymentResponse>(
        `${this.apiUrl}/api/payments?page=${pagination.page}&limit=${pagination.limit}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .pipe(
        map(mapPayments)
      )
    }
}
