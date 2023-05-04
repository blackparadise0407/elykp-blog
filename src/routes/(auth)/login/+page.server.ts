import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData()) as unknown as LoginForm;
    try {
      const { record } = await locals.pb
        .collection('users')
        .authWithPassword<User>(body.username, body.password);
      if (!record.verified) {
        locals.pb.authStore.clear();
        return {
          message: 'Email not verified',
          success: false
        };
      }
    } catch (e: any) {
      return { message: e.message, success: false };
    }
    throw redirect(303, '/');
  }
};
