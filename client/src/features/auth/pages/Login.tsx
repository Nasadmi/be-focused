import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { AuthForm } from '../components/AuthForm';
import { getObjForm, logInFetch } from '../services/auth';
import { useState } from 'react';
import { useToken } from '@hooks/useToken';

export const Login = () => {
  const [err, setErr] = useState<string | undefined>(undefined);
  const { saveToken } = useToken();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(undefined);
    const obj = getObjForm(e);
    const res = await logInFetch(obj);
    if (res === undefined) return;
    if (res.error) {
      setErr(res.error.message);
    }
    if (res.data) {
      saveToken(res.data.token);
    }
  }

  return (
    <div className="flex flex-col items-center md:flex-row md:items-stretch lg:flex-row w-full justify-center">
      <AuthForm handleSubmit={handleSubmit} error={err}/>
      <div className="flex flex-col items-center justify-center gap-4 md:w-[40%] lg:w-[40%] p-2 w-[90%] md:rounded-bl-none md:rounded-tr-2xl md:rounded-br-2xl lg:rounded-br-2xl lg:rounded-tr-2xl rounded-bl-2xl rounded-br-2xl bg-neutral-300 dark:bg-stone-800 md:bg-gradient-to-l lg:bg-gradient-to-l bg-gradient-to-t from-cyan-400 to-neutral-300 dark:from-violet-700 dark:to-stone-800 dark:text-white">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-victor font-bold">Log In</h1>
          <ArrowRightEndOnRectangleIcon className="size-8" />
        </div>
        <Link
          to={"/auth/sign-up"}
          className="font-alan border-b-2 border-b-blue-100 dark:border-b-purple-200"
        >
          Don't you have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};
