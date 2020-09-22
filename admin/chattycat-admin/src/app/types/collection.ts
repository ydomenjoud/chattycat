import { Base } from 'src/app/types/base';

export class Collection extends Base {
  type = 'collections';
  id: string;
  slug!: string;
  name!: string;
  image?: string;
  background?: string;
  introduction?: string;
  description?: string;
}

