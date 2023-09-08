import type {Document, MDX} from "contentlayer/core";

import {slug} from "github-slugger";

export type MDXDocument = Document & {body: MDX};
export type MDXDocumentDate = MDXDocument & {
  date: string;
};
export type MDXBlog = MDXDocumentDate & {
  tags?: string[];
  draft?: boolean;
};

export type MDXAuthor = MDXDocument & {
  name: string;
};

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;

  return 0;
}

export function sortedBlogPost(allBlogs: MDXDocumentDate[]) {
  return allBlogs.sort((a, b) => dateSortDesc(a.date, b.date));
}

type ConvertUndefined<T> = OrNull<{
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K];
}>;
type OrNull<T> = {[K in keyof T]: Exclude<T[K], undefined> | null};
type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>;

/**
 * A typesafe omit helper function
 * @example pick(content, ['title', 'description'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {ConvertPick<{ [K in Keys]: Obj[K] }>}
 */
export const pick = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[],
): ConvertPick<{[K in Keys]: Obj[K]}> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key] ?? null;

    return acc;
  }, {} as any);
};

/**
 * A typesafe omit helper function
 * @example omit(content, ['body', '_raw', '_id'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {Omit<Obj, Keys>}
 */
export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj);

  keys.forEach((key) => {
    delete result[key];
  });

  return result;
};

export type CoreContent<T> = Omit<T, "body" | "_raw" | "_id">;

export function coreContent<T extends MDXDocument>(content: T) {
  return omit(content, ["body", "_raw", "_id"]);
}

export function allCoreContent<T extends MDXDocument>(contents: T[]) {
  return contents.map((c) => coreContent(c)).filter((c) => !("draft" in c && c.draft === true));
}

export async function getAllTags(allBlogs: MDXBlog[]) {
  const tagCount: Record<string, number> = {};

  allBlogs.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);

        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });

  return tagCount;
}
