import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log('Interceptando a requisição...');

    const authToken = localStorage.getItem('authToken');
    console.log('Token de autenticação:', authToken); // Verifica o valor do token

    if (authToken) {
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`,
            }
        });
        console.log('Requisição com token:', clonedRequest); // Verifique se o token foi adicionado corretamente
        return next(clonedRequest);
    }

    console.log('Sem token, passando requisição original');
    return next(req);
}
