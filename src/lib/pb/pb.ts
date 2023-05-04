import PocketBase, { type FileQueryParams, type Record } from 'pocketbase';

import { env } from '@/constants/environment';

export const pb = new PocketBase(env.pbUrl);

export const getPbFileUrl = <T extends Record>(
  record: T | null = null,
  filename = '',
  queryParams: FileQueryParams = {}
) => {
  if (!record) return '';
  if (!filename) return '';
  return pb.getFileUrl(record, filename, queryParams);
};
