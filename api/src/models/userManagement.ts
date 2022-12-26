import { RowDataPacket } from 'mysql2/promise';

export interface UserData extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  name: string;
  permission_group: PermissionGroup;
  changed_init_password: boolean;
  token?: string;
}

export enum PermissionGroup {
  Viewer,
  PremiumViewer,
  Admin,
}
