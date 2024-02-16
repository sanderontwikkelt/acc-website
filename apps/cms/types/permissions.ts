export enum EntityEnum {
  USER = "user",
  ROLE = "role",
  MEDIA = "media",
  PAGE = "page",
  PRODUCT = "product",
  PRODUCTCATEGORY = "productCategory",
  LIBRARY = "library",
  LIBRARYCATEGORY = "libraryCategory",
  ORDER = "order",
  CART = "cart",
  SEO = "seo",
  TEACHER = "teacher",
  COURSE = "course",
}

export enum ActionEnum {
  FIND = "find",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export const permissionEntities = [
  { value: "all", label: "Alles" },
  { value: "page", label: "Pagina's" },
  { value: "user", label: "Gebruikers" },
  { value: "role", label: "Rollen" },
  { value: "media", label: "Media" },
  { value: "product", label: "Producten" },
  { value: "order", label: "Bestellingen" },
  { value: "cart", label: "Winkelmanden" },
  { value: "seo", label: "SEO" },
  { value: "library", label: "Bibliotheek" },
  { value: "teacher", label: "Docenten" },
  { value: "course", label: "Cursussen" },
];

export const permissionActions = [
  { value: "all", label: "Alles" },
  { value: "create", label: "Toevoegen" },
  { value: "update", label: "Bewerken" },
  { value: "delete", label: "Verwijeren" },
  { value: "get", label: "Ophalen" },
];
