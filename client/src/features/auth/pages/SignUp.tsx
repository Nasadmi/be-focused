import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { AuthForm } from '../components/AuthForm';

export const SignUp = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col items-center justify-center gap-4 w-[30%] rounded-tl-2xl rounded-bl-2xl bg-neutral-300 dark:bg-stone-800 bg-gradient-to-r from-cyan-400 to-neutral-300 dark:from-violet-700 dark:to-stone-800 dark:text-white">
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
      <AuthForm handleSubmit={handleSubmit} />
    </div>
  );
};
