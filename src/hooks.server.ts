import { redirect, type Handle } from '@sveltejs/kit';

import { pb } from './lib/pb';

const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = pb;
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
  if (event.locals.pb.authStore.isValid) {
    if (event.route.id?.startsWith('/(auth)')) {
      throw redirect(303, '/');
    }

    event.locals.user = event.locals.pb.authStore.model! as User;
  } else {
    event.locals.user = undefined;
    if (event.route.id?.startsWith('/(protected)')) {
      throw redirect(303, '/');
    }
  }
  const response = await resolve(event);
  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());
  return response;
};

export { handle };
