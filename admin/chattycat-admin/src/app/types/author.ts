import { Base } from 'src/app/types/base';

export class Author extends Base {
  type = 'authors';
  id: string;
  slug!: string;
  name!: string;
  image?: string;
  presentation?: string;
  occupation?: string;

}
