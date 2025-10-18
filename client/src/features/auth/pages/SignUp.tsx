import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from 'react';
import { Link } from "react-router";
import { AuthForm } from '../components/AuthForm';
import { getObjForm, signUpFetch } from '../services/auth';
import { signUpSchema } from '../services/form.schema';
import { useToken } from '@hooks/useToken';

export const SignUp = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const { saveToken } = useToken();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    const obj = getObjForm(e);
    signUpSchema.validate(obj).then(async () => {
      const res = await signUpFetch(obj);
      if (res === undefined) return;
      if (res.error) setError(res.error.message);
      if (res.data) saveToken(res.data.token);
    }).catch((err) => {
      setError(err.errors[0]);
      console.error(err.errors); 
    })
  }

  return (
    <div className="flex flex-col items-center md:flex-row md:items-stretch lg:flex-row w-full justify-center">
      <div className="flex flex-col items-center justify-center gap-4 md:w-[40%] lg:w-[40%] p-2 w-[90%] md:rounded-tr-none md:rounded-tl-2xl md:rounded-bl-2xl lg:rounded-bl-2xl lg:rounded-tl-2xl rounded-tl-2xl rounded-tr-2xl bg-neutral-300 dark:bg-stone-800 md:bg-gradient-to-r lg:bg-gradient-to-r bg-gradient-to-b from-cyan-400 to-neutral-300 dark:from-violet-700 dark:to-stone-800 dark:text-white">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-victor font-bold">Sign Up</h1>
          <PlusCircleIcon className="size-8" />
        </div>
        <Link
          to={"/auth/log-in"}
          className="font-alan border-b-2 border-b-blue-100 dark:border-b-purple-200"
        >
          Do you have an account? Login
        </Link>
      </div>
      <AuthForm handleSubmit={handleSubmit} error={error}/>
    </div>
  );
};
