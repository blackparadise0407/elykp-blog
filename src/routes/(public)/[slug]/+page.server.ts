import { error, type ServerLoad } from '@sveltejs/kit';
import sanitize from 'sanitize-html';

import { BAD_REQUEST } from '@/constants/messages';
import { serializeNonPOJOs } from '@/lib/helpers/serialize';

export const load: ServerLoad = async ({ locals, params: { slug = '' } }) => {
  const id = slug.substring(slug.lastIndexOf('-') + 1, slug.length);
  if (!id) {
    throw error(400, { message: BAD_REQUEST, code: 400 });
  }
  try {
    const post = await locals.pb.collection('posts').getOne<Post>(id, {
      expand: 'author,tags'
    });
    post.content = sanitize(post.content, {
      allowedClasses: {
        pre: ['language-*']
      }
    });

    return {
      post: serializeNonPOJOs(post)
    };
  } catch (err: any) {
    const code = err?.status ?? 500;
    throw error(code, { message: err?.message, code });
  }
};
