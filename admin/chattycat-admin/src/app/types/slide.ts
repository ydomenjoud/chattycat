import { Base } from 'src/app/types/base';

export class Slide extends Base {
  type = 'slides';
  id: string;
  active?: boolean;
  title?: string;
  body?: string;
  button?: string;
  url?: string;
  backgroundColor?: string;
  fontColor?: string;
  image?: string;
  position?: number;
}
