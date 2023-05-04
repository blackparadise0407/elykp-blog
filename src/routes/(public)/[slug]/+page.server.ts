import { error, type ServerLoad } from '@sveltejs/kit';
import sanitize from 'sanitize-html';

import { BAD_REQUEST, NOT_FOUND } from '@/constants/messages';
import { serializeNonPOJOs } from '@/lib/helpers/serialize';

export const load: ServerLoad = async ({ locals, params: { slug = '' } }) => {
  const id = slug.substring(slug.lastIndexOf('-') + 1, slug.length);
  if (!id) {
    throw error(400, BAD_REQUEST);
  }
  const post = await locals.pb.collection('posts').getOne<Post>(id, {
    expand: 'author,tags'
  });

  if (!post) {
    throw error(404, NOT_FOUND);
  }

  post.content = sanitize(post.content);

  return {
    post: serializeNonPOJOs(post)
  };
};
