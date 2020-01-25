import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

export interface AutorInt {
  id: number,
  nombre: string,
  genero: string,
  img: string,
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  autores = new BehaviorSubject([]);
  libros = new BehaviorSubject([]);
  constructor(
    private platform: Platform,
    private sqlLitePorter: SQLitePorter,
    private sqlLite: SQLite,
    private httpClient: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.sqlLite.create({
        name: 'autores.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.setDatabase();
      });
    });
  }

  setDatabase() {
    this.httpClient.get('assets/MySQL Scripts/Autor.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlLitePorter.importSqlToDb(this.database, sql)
      .then(_ => {
        this.loadAutores();
        this.loadLibros();
        this.dbReady.next(true);
      }).
      catch(e => console.error(e));
    });
  }

  loadAutores() {
    return this.database.executeSql('SELECT * FROM autor', [])
    .then(data => {
      let autores: AutorInt[] = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          autores.push({
            id: data.rows.item(i).id,
            nombre: data.rows.item(i).nombre,
            genero: data.rows.item(i).genero,
            img: data.rows.item(i).img
          });
        }
      }
    });
  }

  loadLibros() {
    let query = 'SELECT obra.titulo, obra.id, autor.nombre, AS autor FROM obra JOIN autor ON autor.id = obra.autorId';
    return this.database.executeSql(query, [])
    .then(data => {
      let books = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          books.push({ 
            titulo: data.rows.item(i).titulo,
            id: data.rows.item(i).id,
            autor: data.rows.item(i).autor,
           });
        }
      }
    });
  }
  addLibro(titulo, autor) {
    let data = [titulo, autor];
    console.log(titulo, '     ', autor);
    return this.database.executeSql('INSERT INTO obra (titulo, autorId) VALUES (?, ?)', data)
    .then(data => {
      this.loadLibros();
    });
  }

  addAutor(nombre, genero, img) {
    let data = [nombre, genero, img];
    return this.database.executeSql('INSERT INTO autor (nombre, genro, img) VALUES (?, ?, ?)', data)
    .then(data => {
      this.loadAutores();
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getAutores(): Observable<AutorInt[]> {
   return this.autores.asObservable();
  }

  getLibros(): Observable<any[]> {
    return this.libros.asObservable();
  }

  getAutor(id): Promise<AutorInt> {
    return this.database.executeSql('SELECT * FROM autor WHERE id = ?', [id])
    .then(data => {
      return {
        id: data.rows.item(0).id,
        nombre: data.rows.item(0).nombre,
        genero: data.rows.item(0).genero,
        img: data.rows.item(0).img
      };
    });
  }

  deleteAutor(id) {
    return this.database.executeSql('DELETE FROM autor WHERE id = ?', [id])
    .then(_ => {
      this.loadAutores();
      this.loadLibros();
    });
  }

  updateAutor(autorx: AutorInt) {
    let data = [autorx.nombre, autorx.genero, autorx.img];
    return this.database.executeSql(`UPDATE autor SET nombre = ?, genero = ?, img = ? WHERE id = ${autorx.id}`, data)
    .then(data => {
      this.loadAutores();
    })
  }
}
