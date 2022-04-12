import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type httpParams = HttpParams | { [param: string]: string | string[] } | undefined;

export type rawType = {
  [key: string]: any;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(protected http: HttpClient) {}

  head(url: string, params?: httpParams): Observable<object> {
    return this.http.head(url, { params });
  }

  get<T>(url: string, params?: httpParams): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  post<T>(url: string, data: rawType | FormData, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, data, { headers });
  }

  put<T>(url: string, body?: rawType | FormData, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { headers });
  }

  patch<T>(url: string, body: unknown, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(url, body, { headers });
  }

  delete(url: string): Observable<void> {
    return this.http.delete<void>(url);
  }
}
