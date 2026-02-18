export interface IContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  unread: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IContactFilters {
  search?: string | undefined;
  unread?: boolean | undefined;
  archived?: boolean | undefined;
}
