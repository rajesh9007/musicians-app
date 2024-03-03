import { Component, OnInit } from '@angular/core';
import { Musician } from './musician.model';
import { MusicianService } from './musician.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  musicians: Musician[] = [];
  newMusician: Musician = {
    name: '',
    instrument: '',
    genre: '',
    yearsExperience: 0,
    bands: [],
    albumsRecorded: [],
    concertsPerformed: [],
  };
  selectedMusician: Musician | null = null;
  addModalVisible = false;

  constructor(private musicianService: MusicianService) {
    this.getMusicians();
  }

  ngOnInit(): void {
    this.getMusicians();
  }

  getMusicians(): void {
    this.musicianService
      .getMusicians()
      .subscribe((musicians) => (this.musicians = musicians));
  }

  addMusician(): void {
    this.musicianService.addMusician(this.newMusician).subscribe(() => {
      this.getMusicians();
      this.newMusician = {
        name: '',
        instrument: '',
        genre: '',
        yearsExperience: 0,
        bands: [],
        albumsRecorded: [],
        concertsPerformed: [],
      };
    });
  }

  updateMusician(musicians: Musician) {
    if (musicians._id) {
      this.musicianService.updateMusician(musicians._id, musicians).subscribe(
        (updatedMusicians) => {
          const index = this.musicians.findIndex(
            (p) => p._id === updatedMusicians._id
          );
          if (index !== -1) {
            this.musicians[index] = updatedMusicians;
          }
        },
        (error) => {
          console.error('Error updating musicians:', error);
        }
      );
    }
  }

  deleteMusician(musicianId: string | undefined): void {
    if (!musicianId) {
      return;
    }
    this.musicianService
      .deleteMusician(musicianId)
      .subscribe(() => this.getMusicians());
  }
}
