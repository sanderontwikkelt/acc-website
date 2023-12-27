export enum EntityEnum {
  PAGE = "page",
  USER = "user",
  ROLE = "role",
  MEDIA = "media",
  TEACHER = "teacher",
  CATEGORY = "category",
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
  { value: "teacher", label: "Teacher" },
  { value: "category", label: "Categorieën" },
]
