import { error, type ServerLoad } from '@sveltejs/kit';
import sanitize from 'sanitize-html';

import { BAD_REQUEST, NOT_FOUND } from '@/constants/messages';
import { serializeNonPOJOs } from '@/lib/helpers/serialize';

export const load: ServerLoad = async ({ locals, params: { slug = '' } }) => {
  const id = slug.substring(slug.lastIndexOf('-') + 1, slug.length);
  console.log(id);
  if (!id) {
    throw error(400, { message: BAD_REQUEST, code: 400 });
  }
  try {
    const post = await locals.pb.collection('posts').getOne<Post>(id, {
      expand: 'author,tags'
    });

    if (!post) {
      throw error(404, { message: NOT_FOUND, code: 404 });
    }

    post.content = sanitize(post.content);

    return {
      post: serializeNonPOJOs(post)
    };
  } catch (err: any) {
    const code = err?.status ?? 500;
    throw error(code, { message: err?.message, code });
  }
};
