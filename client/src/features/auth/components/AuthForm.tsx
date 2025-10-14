import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import type React from "react";
import { useRef, useLayoutEffect, useState } from "react";
import { useTheme } from "@hooks/useTheme";

export const AuthForm = ({ handleSubmit }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => {
  const [lettersEmail, setLettersEmail] = useState<number>(0);
  const [lettersPassword, setLettersPassword] = useState<number>(0);
  const emailRef = useRef<HTMLInputElement>(null);
  const [widthPerLetter, setWidthPerLetter] = useState(50);

  const { theme } = useTheme();

  useLayoutEffect(() => {
    if (emailRef.current) {
      const width = emailRef.current.getBoundingClientRect().width;
      setWidthPerLetter(width / 10);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const letters = value.split("").length;

    if (id === "email") {
      setLettersEmail(letters);
    } else {
      setLettersPassword(letters);
    }
  };

  return (
    <form
      className="flex flex-col gap-1 dark:bg-stone-800 bg-neutral-300 p-4 w-[40%]"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="email"
        className="text-2xl font-alan font-bold dark:text-white"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="relative outline-0 text-lg dark:text-zinc-900 bg-sky-400 dark:bg-violet-500 rounded-md p-1 px-2 font-alan bg-no-repeat bg-size-[0% 100%] transition-[background-size] duration-300 ease-in-out"
        autoComplete="off"
        spellCheck={false}
        style={{
          backgroundImage: `linear-gradient(90deg, ${
            theme === "light"
              ? "rgba(43, 127, 255, 1), rgba(0, 188, 255, 1)"
              : "#c27aff, #8e51ff"
          })`,
          backgroundSize: `${
            ((lettersEmail + 5) / widthPerLetter) * 100
          }% 100%`,
        }}
        onChange={handleChange}
      />
      <label
        htmlFor="password"
        className="text-2xl font-alan font-bold mt-1 dark:text-white"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="outline-0 text-lg dark:text-zinc-900 bg-blue-500 rounded-md py-1 dark:bg-purple-400 px-2 bg-no-repeat bg-size-[0% 100%] transition-[background-size] duration-300 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(90deg, ${
            theme === "light"
              ? "rgba(0, 188, 255, 1), rgba(43, 127, 255, 1)"
              : "#8e51ff, #c27aff"
          })`,
          backgroundSize: `${
            ((lettersPassword + 5) / widthPerLetter) * 100
          }% 100%`,
        }}
        onChange={handleChange}
      />
      <button
        type="submit"
        aria-label="Submit Form"
        className="self-center mt-4 cursor-pointer text-white bg-blue-600 p-2 rounded-4xl hover:bg-white hover:text-blue-500 transition-all dark:text-zinc-900 dark:bg-violet-600 dark:hover:bg-zinc-900 dark:hover:text-violet-500"
      >
        <ArrowRightCircleIcon className="size-6" strokeWidth={"2px"} />
      </button>
    </form>
  );
};
