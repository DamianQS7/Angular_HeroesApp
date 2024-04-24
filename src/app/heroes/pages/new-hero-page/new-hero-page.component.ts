import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, filter, switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: ``
})
export class NewHeroPageComponent implements OnInit{
  
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = ['DC Comics', 'Marvel Comics'];
  
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById(id) ),
      )
      .subscribe(hero => {
        if(!hero) return this.router.navigateByUrl('/heroes/list');

        return this.heroForm.reset(hero);
      });
  }

  public get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  public onSubmit(): Subscription | undefined {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      return this.heroesService.partialUpdateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`${hero.superhero} updated successfully`);
        });
    }

    return this.heroesService.addHero(this.currentHero)
        .subscribe( hero => {
          this.showSnackbar(`${hero.superhero} added successfully`);
          this.router.navigateByUrl('/heroes/list');
        })
  }

  public onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero ID is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result),
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
        filter( (wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.router.navigateByUrl('/heroes/list');
        this.showSnackbar(`${this.currentHero.superhero} deleted successfully`);
      });
  }

  public showSnackbar(message: string): void {
    this.snackbar.open(message, 'Ok', {
      duration: 2500
    })
  }
}
