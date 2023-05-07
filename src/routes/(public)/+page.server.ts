import { error, type ServerLoad } from '@sveltejs/kit';

import { serializeNonPOJOs } from '@/lib/helpers/serialize';
import { BAD_REQUEST } from '@/constants/messages';

export const load: ServerLoad = async ({ locals, url }) => {
  const page = +(url.searchParams.get('page') ?? 0);
  if (page < 0) {
    throw error(400, {
      message: BAD_REQUEST
    });
  }

  const latestPost = await locals.pb
    .collection('posts')
    .getFirstListItem<Post>('', {
      sort: '-created'
    })
    .catch(() => null);

  return {
    latestPost: serializeNonPOJOs(latestPost)
  };
};
