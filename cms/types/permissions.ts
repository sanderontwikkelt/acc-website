export enum EntityEnum {
  PAGE = 'page',
  USER = 'user',
  ROLE = 'role',
  MEDIA = 'media',
  PORTFOLIO = 'portfolio',
  CATEGORY = 'category',
}

export enum ActionEnum {
  FIND = 'find',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export const permissionEntities = [
  { value: 'page', label: "Pagina's" },
  { value: 'user', label: 'Gebruikers' },
  { value: 'role', label: 'Rollen' },
  { value: 'media', label: 'Media' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'category', label: 'Categorieën' },
]
