import type { FormEvent } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
type Form = FormEvent<HTMLFormElement>;
type ObjForm = { [key: string]: FormDataEntryValue };

interface Response {
  data: { token: string } | null;
  error: { message: string } | null;
}

export const getObjForm = (e: Form) => {
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData);
  obj.email = (obj.email as string).trim();
  obj.password = (obj.password as string).trim();
  return obj;
};

export const signUpFetch = async (obj: ObjForm): Promise<Response | void> => {
  try {
    const request = await fetch(`${SERVER_URL}/user`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });
    if (!request.ok) {
      const errRes = await request.json();
      return {
        data: null,
        error: { message: errRes.statusCode === 409 ? 'user already exist' : errRes.message },
      };
    }
    const res = await request.json();
    const data = res;
    return { data, error: null };
  } catch (err) {
    console.error(err);
  }
};

export const logInFetch = async (obj: ObjForm): Promise<Response | void> => {
  try {
    const request = await fetch(`${SERVER_URL}/auth`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });
    if (!request.ok) {
      const errRes = await request.json();
      return {
        data: null,
        error: { message: errRes.message },
      };
    }
    const res = await request.json();
    const data = res;
    return { data, error: null };
  } catch (err) {
    console.error(err);
  }
};
