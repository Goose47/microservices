import {Role} from "./role";
import {Permission} from "./permission";

export interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  permissions: Permission[];
  role: Role
}
