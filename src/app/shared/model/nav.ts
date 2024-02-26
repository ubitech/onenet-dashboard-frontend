import {NavChild} from './nav-child';

export class Nav {
  label: string;
  content: NavChild[];
  icon?: string;
  hidden: boolean;
  url?: string;
}
