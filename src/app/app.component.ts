import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'data-fetching';
  frequencyArr: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const frequencyMap: any = {};
    this.dataService.getData().subscribe({
      next: (response) => {
        const numberArr = response.trim().split('\n').map(Number);

        numberArr.forEach((num: number) => {
          if (frequencyMap[num]) {
            frequencyMap[num]++; 
          } else {
            frequencyMap[num] = 1;
          }
        })


        // handle map
        const keys: number[] = Object.keys(frequencyMap).map(Number);
        const values: number[] = Object.values(frequencyMap);
        const maxY = Math.max(...values);
        const minX = Math.min(...keys);

        // convert in object array
        this.frequencyArr = Object.keys(frequencyMap).map(key => ({
          number: key,
          frequency: frequencyMap[key],
          height: `${Math.round((frequencyMap[key] / maxY) * 100)}%`
        }));

        
        console.log(this.frequencyArr)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
