import {Component, OnInit} from '@angular/core';
import {Etudiant} from '../model/etudiant.model';
import {AuthService} from '../services/auth.service';
import {EtudiantService} from '../services/etudiant.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
})

export class EtudiantsComponent implements OnInit {
  etudiants: any = [];
  searchText: any;

  constructor(private etudiantService: EtudiantService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.etudiantService.listeEtudiants().subscribe((etud) => {
      console.log(etud);
      this.etudiants = etud;
    })
  }

  supprimerEtudiant(e: Etudiant) {

    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.etudiantService.supprimerEtudiant(e.idEtudiant).subscribe(() => {
        this.SuprimerEtudiantDuTableau(e);
      });
  }

  SuprimerEtudiantDuTableau(etud: Etudiant) {
    this.etudiants.forEach((cur: { idEtudiant: number; }, index: any) => {
      if (etud.idEtudiant === cur.idEtudiant) {
        this.etudiants.splice(index, 1);
      }
    });
  }
}
