import chalk from "chalk";
/**
 * Enumerado con los tipos de Funko Pop!
 *
 * @export
 * @enum {number}
 */
export enum Tipo {
  POP = "Pop!",
}
/**
 * Enumerado con los géneros de Funko Pop!
 *
 * @export
 * @enum {number}
 */
export enum Genero {
  ANIMATION = "Animación",
  VIDEOGAMES = "Videojuegos",
}

export type Franquicia = "Harry potter"| "Pokemon"
/**
 * Clase Funko Pop!
 *
 * @export
 * @class Funko
 */
export class Funko {

  private id: number;
  private nombre: string;
  private descripcion: string;
  private tipo: Tipo;
  private genero: Genero;
  private franquicia: Franquicia;
  private numero: number;
  private exclusivo: boolean;
  private caracteristicasEspeciales: string;
  private valor: number;
/**
 * Creates an instance of Funko.
 * @param {number} id Identificador del Funko
 * @param {string} nombre Nombre del Funko
 * @param {string} descripcion Descripción del Funko
 * @param {Tipo} tipo Tipo de Funko
 * @param {Genero} genero Género del Funko
 * @param {Franquicia} franquicia Franquicia del Funko
 * @param {number} numero Número de la colección
 * @param {boolean} exclusivo Indica si el Funko es exclusivo
 * @param {string} caracteristicasEspeciales Características especiales del Funko
 * @param {number} valor Valor del Funko
 * @memberof Funko Pop!
 */
constructor(id: number, nombre: string, descripcion: string, tipo: Tipo, genero: Genero, franquicia: Franquicia, numero: number, exclusivo: boolean, caracteristicasEspeciales: string, valor: number) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.genero = genero;
    this.franquicia = franquicia;
    this.numero = numero;
    this.exclusivo = exclusivo;
    this.caracteristicasEspeciales = caracteristicasEspeciales;
    this.valor = valor;
  }
/**
 * Devuelve el identificador del Funko
 *
 * @return {*}  {number}
 * @memberof Funko
 */
public getId(): number {
    return this.id;
  }
/**
 * Establece el identificador del Funko
 *
 * @param {number} id
 * @memberof Funko
 */
public setId(id: number): void {
    this.id = id;
  }
/**
 * Devuelve el nombre del Funko
 *
 * @return {*}  {string}
 * @memberof Funko
 */
public getNombre(): string {
    return this.nombre;
  }
/**
 * Establece el nombre del Funko
 *
 * @param {string} nombre
 * @memberof Funko
 */
public setNombre(nombre: string): void {
    this.nombre = nombre;
  }
/**
 * Devuelve la descripción del Funko
 *
 * @return {*}  {string}
 * @memberof Funko
 */
public getDescripcion(): string {
    return this.descripcion;
  }
/**
 * Establece la descripción del Funko
 *
 * @param {string} descripcion
 * @memberof Funko
 */
public setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }
/**
 * Devuelve el tipo del Funko
 *
 * @return {*}  {Tipo}
 * @memberof Funko
 */
public getTipo(): Tipo {
    return this.tipo;
  }
/**
 * Establece el tipo del Funko
 *
 * @param {Tipo} tipo
 * @memberof Funko
 */
public setTipo(tipo: Tipo): void {
    this.tipo = tipo;
  }
/**
 * Devuelve el género del Funko
 *
 * @return {*}  {Genero}
 * @memberof Funko
 */
public getGenero(): Genero {
    return this.genero;
  }
/**
 * Establece el género del Funko
 *
 * @param {Genero} genero
 * @memberof Funko
 */
public setGenero(genero: Genero): void {
    this.genero = genero;
  }
/**
 * Devuelve la franquicia del Funko
 *
 * @return {*}  {Franquicia}
 * @memberof Funko
 */
public getFranquicia(): Franquicia {
    return this.franquicia;
  }
/**
 * Establece la franquicia del Funko
 *
 * @param {Franquicia} franquicia
 * @memberof Funko
 */
public setFranquicia(franquicia: Franquicia): void {
    this.franquicia = franquicia;
  }
/**
 * Devuelve el número de la colección del Funko
 *
 * @return {*}  {number}
 * @memberof Funko
 */
public getNumero(): number {
    return this.numero;
  }
/**
 * Establece el número de la colección del Funko
 *
 * @param {number} numero
 * @memberof Funko
 */
public setNumero(numero: number): void {
    this.numero = numero;
  }
/**
 * Devuelve si el Funko es exclusivo
 *
 * @return {*}  {boolean}
 * @memberof Funko
 */
public getExclusivo(): boolean {
    return this.exclusivo;
  }
/**
 * Establece si el Funko es exclusivo
 *
 * @param {boolean} exclusivo
 * @memberof Funko
 */
public setExclusivo(exclusivo: boolean): void {
    this.exclusivo = exclusivo;
  }
/**
 * Devuelve las características especiales del Funko
 *
 * @return {*}  {string}
 * @memberof Funko
 */
public getCaracteristicasEspeciales(): string {
    return this.caracteristicasEspeciales;
  }
/**
 * Establece las características especiales del Funko
 *
 * @param {string} caracteristicasEspeciales
 * @memberof Funko
 */
public setCaracteristicasEspeciales(caracteristicasEspeciales: string): void {
    this.caracteristicasEspeciales = caracteristicasEspeciales;
  }
/**
 * Devuelve el valor del Funko
 *
 * @return {*}  {number}
 * @memberof Funko
 */
public getValor(): number {
    return this.valor;
  }
/**
 * Establece el valor del Funko
 *
 * @param {number} valor
 * @memberof Funko
 */
public setValor(valor: number): void {
    this.valor = valor;
  }
/**
 * Devuelve el Funko en formato string
 *
 * @return {*}  {string}
 * @memberof Funko Pop!
 */
public print() {
    let str = "";
    str = "ID: " + this.id +
    "\nNombre: " + this.nombre +
    "\nDescripcion: " + this.descripcion +
    "\nTipo: " + this.tipo +
    "\nGenero: " + this.genero +
    "\nFranquicia: " + this.franquicia +
    "\nNumero: " + this.numero +
    "\nExclusivo: " + this.exclusivo +
    "\nCaracteristicas especiales: " + this.caracteristicasEspeciales + "\n";

    if (this.valor <= 25) {
      str +=chalk.red(`Valor: ${this.valor}`)
    }

    if (this.valor > 25 && this.valor <= 50) {
      str +=chalk.yellow(`Valor: ${this.valor}`)
    }

    if (this.valor > 50 && this.valor <= 75) {
      str +=chalk.blue(`Valor: ${this.valor}`)
    }

    if (this.valor > 75) {
      str +=chalk.green(`Valor: ${this.valor}`)
    }

    return str;
  }  
}