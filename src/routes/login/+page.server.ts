import { redirect } from '@sveltejs/kit';
import { Route } from '../../core/enums/route.enum';



export function load() {
  const isAuthenticated = true;

  if (isAuthenticated) {
    throw redirect(303, Route.Home);
  }
}