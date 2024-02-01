export enum EntityEnum {
  USER = "user",
  ROLE = "role",
  MEDIA = "media",
  PRODUCT = "product",
  ORDER = "order",
  CART = "cart",
}

export enum ActionEnum {
  FIND = "find",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export const permissionEntities = [
  { value: "page", label: "Pagina's" },
  { value: "user", label: "Gebruikers" },
  { value: "role", label: "Rollen" },
  { value: "media", label: "Media" },
  { value: "product", label: "Producten" },
  { value: "order", label: "Bestellingen" },
  { value: "cart", label: "Winkelmanden" },
];
