import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API = "http://localhost:8080/api/auth/";

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(credentials): Observable<any> {
        return this.http.post(
            AUTH_API + "signin",
            {
                username: credentials.username,
                password: credentials.password,
            },
            httpOptions
        );
    }

    register(user): Observable<any> {
        return this.http.post(
            AUTH_API + "signup",
            {
                nombre: user.nombre,
                segundoNombre: user.segundoNombre,
                apellido: user.apellido,
                segundoApellido: user.segundoApellido,
                identificacion: user.identificacion,
                telefono: user.telefono,
                razonSocial: user.razonSocial,
                direccion: user.direccion,
                username: user.username,
                email: user.email,
                password: user.password,
            },
            httpOptions
        );
    }
}
