export interface Menu {

  header?: string;    // es el nombre del grupo que se coloca como encabezado
  menuItems?: Menu[]; // grupo de menus que no tienen header, pueden o no tener submenus
  title: string;      // titulo del menu para mostrar en la vista
  icon: string;       // icono de font awesome para colocar a la izquierda del titulo
  link?: string;      // ruta de la applicacion a la que redirige el enlace (solo enlaces sin hijos)
  roles?: string[];   // nombres de los roles autorizados a acceder al menu

}
