import { Component, OnInit } from '@angular/core';
import { Clustering } from '../../enums/clustering';

@Component({
  selector: 'app-clustering-filters',
  templateUrl: './clustering-filters.component.html',
  styleUrls: ['./clustering-filters.component.scss']
})
export class ClusteringFiltersComponent implements OnInit {
  clusteringFilters = {
    All: true,
    Morning: false,
    Late: false,
    Double: false
  }
  public Clustering = Clustering;
  clustering = Clustering.Level;
  constructor() { }

  ngOnInit(): void {
  }

  public changeFilter(filterText: string): void {
    this.clusteringFilters[filterText] = !this.clusteringFilters[filterText];
  }

  public setClustering(clustering: Clustering) {
    this.clustering = clustering;
  }

}
