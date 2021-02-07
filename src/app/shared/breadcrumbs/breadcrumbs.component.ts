import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  public titulo: string;
  public icono: string;

  constructor(private router: Router,
              private title: Title,
              private meta: Meta) {
    this.getDataRoute()
    .subscribe(datosRuta => {
      this.titulo = datosRuta.titulo;
      this.icono = datosRuta.icono;

      // con esto cambiamos el titulo de la pestaña de la pagina html
      this.title.setTitle(this.titulo);

      // asi se puede construir un meta-tag de forma dinamica dependiendo de la ruta actual
      const metaTag: MetaDefinition = {
        name: 'description',
        content: datosRuta.descripcion
      };
      // esta llamada es necesaria para actualizar el meta que hemos creado arriba
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {
  }

  // de los eventos del router nos interesa el ActivationEnd que es donde esta la data que se agrega a la ruta
  getDataRoute(): Observable<any> {
    return this.router.events.pipe(
      filter((e) => e instanceof ActivationEnd),
      filter((e: ActivationEnd) => e.snapshot.firstChild === null),
      map((e: ActivationEnd) => e.snapshot.data)
    );
  }

}
