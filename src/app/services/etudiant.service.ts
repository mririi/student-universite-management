import {Injectable} from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {University} from '../model/university.model';
import {UniversityService} from './university.service';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  apiURL: string = 'http://localhost:8080/etudiants/api';
  etudiants: Etudiant[] = [];
  universite: University = new University();
  universities: University[] = [];
  etudiantsRecherche!: Etudiant[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private universityService: UniversityService
  ) {
    this.listeEtudiants().subscribe((response) => {
      this.etudiants = response;
    });

    this.universityService.listeUniversity().subscribe((response) => {
      this.universities = response;
    })
  }

  listeEtudiants(): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.get(this.apiURL + '/all', {headers: httpHeaders});
  }

  ajouterEtudiants(etud: Etudiant): Observable<Etudiant> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.post<Etudiant>(this.apiURL, etud, {
      headers: httpHeaders,
    });
  }

  consulterUniversite(id: number): University {
    this.universite = this.universities.find(uni => uni.idUni === +id) as University;
    console.log(this.universite);
    return this.universite;
  }

  supprimerEtudiant(id: number) {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.delete(url, {headers: httpHeaders});
  }

  consulterEtudiant(id: number): Observable<Etudiant> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.get<Etudiant>(url, {headers: httpHeaders});
  }

  updateEtudiant(etud: Etudiant): Observable<Etudiant> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.put<Etudiant>(this.apiURL, etud, {headers: httpHeaders});
  }

  rechercherParUniversite(idUni: number): Etudiant[] {
    this.etudiantsRecherche = [];
    this.etudiants.forEach((cur, index) => {
      if (idUni == cur.universite.idUni) {
        console.log('cur ' + cur);
        this.etudiantsRecherche.push(cur);
      }
    });
    return this.etudiantsRecherche;
  }
}
