import type { Record } from 'pocketbase';

declare global {
  interface User extends Record {
    username: string;
    email: string;
    verified: boolean;
    avatar: string;
    emailVisibility: boolean;
  }

  interface LoginForm {
    username: string;
    password: string;
  }

  interface Post extends Record {
    title: string;
    slug: string;
    description: string;
    tags: string[];
    banner: string;
    content: string;
    author: string;
    expand: {
      author?: User;
      tags?: Tag[];
    };
  }

  interface Tag extends Record {
    name: string;
    slug: string;
  }

  interface Comment extends Record {
    content: string;
    commenter: string;
    post: string;
  }

  type CommentSubmitPayload = Pick<CreateCommentDto, 'content' | 'commenter'>;

  interface CreateCommentDto {
    commenter: string;
    content: string;
    post: string;
  }
}

export {};
