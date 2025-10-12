import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { AuthForm } from '../components/AuthForm';

export const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div className="flex w-full justify-center">
      <AuthForm handleSubmit={handleSubmit} />
      <div className="flex flex-col items-center justify-center gap-4 w-[30%] rounded-tr-2xl rounded-br-2xl bg-neutral-300 dark:bg-stone-800 bg-gradient-to-r from-neutral-300 to-cyan-400 dark:from-stone-800 dark:to-violet-700 dark:text-white">
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
