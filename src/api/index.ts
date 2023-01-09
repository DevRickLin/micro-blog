import {IComment} from '../types/blog.interface';
import {IExpress} from '../types/express.interface';

const baseURL = 'http://211.101.245.187:8888';

export async function login(
  user: number,
  pwd: string,
): Promise<{userPassword: string; userID: number; userName: string}> {
  const res = await (
    await fetch(`${baseURL}/blog/login`, {
      method: 'POST',
      body: JSON.stringify({
        userID: user,
        userPassword: pwd,
      }),
    })
  ).json();
  if (res.code === 0) {
    throw new Error(res.msg);
  }

  return res.content;
}

export async function addBlog(userID: number, blogContent: string) {
  const res = await (
    await fetch(`${baseURL}/blog/addBlog`, {
      method: 'POST',
      body: JSON.stringify({
        userID,
        blogContent,
      }),
    })
  ).json();
  if (res.code !== 1) {
    throw new Error(res.msg);
  }
  return res;
}

export async function addComment(
  userID: number,
  blogID: number,
  commentContent: string,
) {
  const res = await (
    await fetch(`${baseURL}/blog/addComment`, {
      method: 'POST',
      body: JSON.stringify({
        userID,
        blogID,
        commentContent,
      }),
    })
  ).json();
  return res;
}

export async function findBlogs(start: number, number: number) {
  const res = await (
    await fetch(`${baseURL}/blog/findBlogs?start=${start}&number=${number}`)
  ).json();
  return res.content;
}

export async function findComments(blogID: number): Promise<IComment[]> {
  const res = await (
    await fetch(`${baseURL}/blog/findComments?blogID=${blogID}`)
  ).json();
  return res.content || [];
}

export async function findExpress(expressID: number): Promise<IExpress> {
  const res = await (
    await fetch(`${baseURL}/blog/findExpress?expressID=${expressID}`)
  ).json();
  return res.content;
}

export async function findAllUser() {
  const res = await (await fetch(`${baseURL}/blog/findAllUser`)).json();
  return res.content;
}
