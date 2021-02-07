import { Examen } from './examen';
import { Generic } from './generic';
export class Pregunta implements Generic{
    id: number;
    nombre: string;
    examen: Examen;
}
