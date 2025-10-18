export const setCookie = (name: string, value: string, hours: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  const expires = date.toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/`;
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(';').shift();
}