import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Etudiant} from '../model/etudiant.model';
import {University} from '../model/university.model';
import {EtudiantService} from '../services/etudiant.service';
import {UniversityService} from '../services/university.service';

@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styleUrls: ['./update-etudiant.component.css'],
})
export class UpdateEtudiantComponent implements OnInit {
  currentEtudiant = new Etudiant();
  universityList: University[] = [];
  updatedUniversity!: University;
  idUni!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService,
    public universityService: UniversityService
  ) {
  }

  ngOnInit(): void {
    this.onSelectUni();
    this.etudiantService.consulterEtudiant(this.activatedRoute.snapshot.params['id'])
      .subscribe(
        (etud) => {
          this.currentEtudiant = etud;
          this.updatedUniversity = etud.universite;
          this.idUni = this.currentEtudiant.universite.idUni;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateEtudiant() {
    this.updatedUniversity = this.etudiantService.consulterUniversite(this.idUni);
    this.currentEtudiant.universite = this.updatedUniversity;
    this.etudiantService.updateEtudiant(this.currentEtudiant).subscribe({
      next: () => {
        this.router.navigate(['etudiants']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSelectUni() {
    this.universityService.listeUniversity().subscribe((response) => {
      this.universityList = response;
    });
  }
}
