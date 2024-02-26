import {MapAddress} from './map-address';

export interface MapResponse {
  place_id: string;
  osm_type: string;
  boundingbox: string;
  lat: string;
  lon: string;
  display_name: string;
  category: string;
  type: string;
  importance: number;
  icon: string;
  address: MapAddress;
  extratags: { [index: string]: string };
  place_rank: number;
}
