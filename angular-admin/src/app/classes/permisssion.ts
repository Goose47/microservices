import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Auth} from "./auth";

export class Permisssion implements CanActivate{
  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return Auth.canAccess(route.data);
  }
}
