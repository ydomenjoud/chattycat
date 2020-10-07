import { Base } from 'src/app/types/base';

export class Book extends Base {
  type = 'books';
  id?: string;
  slug?: string;
  age?: string;
  author?: string; // link to author ID deprecated
  authors?: string[]; // links to author ID
  illustrators?: string[]; // links to illustrators ID
  collection?: string; // link to Collection ID
  couverture?: string;
  parution?: Date;
  ean?: string;
  genre?: string;
  illustrator?: string[]; // link to illustrator ID
  image?: string; // url to storage
  image2?: string; // url to storage
  introduction?: string;
  pages?: number;
  prix?: string;
  size?: string; // "Dimension" on "book page"
  support?: string;
  summary?: string;
  themes?: string;
  title?: string; // deprecated
  name?: string; //replace title
  keywords?: string[];
  age_cat?: string;
  titre_phare?: boolean;
  soundcloud?: string;
  calameo?: string;
  youtube?: string;

  other_informations?: string; // autour du livre
  bonus?: string;
  links: any;

}

