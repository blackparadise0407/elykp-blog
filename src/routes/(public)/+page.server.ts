import { error, type ServerLoad } from '@sveltejs/kit';

import { serializeNonPOJOs } from '@/lib/helpers/serialize';
import { BAD_REQUEST } from '@/constants/messages';

const PER_PAGE = 10;

export const load: ServerLoad = async ({ locals, url }) => {
  const page = +(url.searchParams.get('page') ?? 0);
  if (page < 0) {
    throw error(400, {
      message: BAD_REQUEST
    });
  }
  let filter = '';
  const tags = url.searchParams.get('tags');
  if (tags) {
    filter += `tags ~ '${tags}'`;
  }
  const data = await locals.pb.collection('posts').getList<Post>(page, PER_PAGE, {
    expand: 'tags',
    filter
  });
  return serializeNonPOJOs(data);
};
