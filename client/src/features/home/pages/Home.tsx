import "../styles/Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ThemeSwitcher } from "@components/ThemeSwitcher";

export const Home = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <main className="flex flex-col lg:gap-[10%] md:gap-[10%] justify-center items-center h-full">
      <ThemeSwitcher styles="absolute top-10 right-10" />
      <span
        className="w-[200px] h-[200px] bg-blue-500/50 dark:bg-indigo-500/50 rounded-full absolute blur-3xl -z-10 hidden md:block lg:block"
        style={{
          left: Math.min(Math.max(position.x - 100, 0), window.innerWidth - 200),
          top: Math.min(Math.max(position.y - 100, 0), window.innerHeight - 200),
        }}
      ></span>
      <h1 className='before:w-[100%] before:h-[3px] relative before:absolute before:bg-blue-300 dark:before:bg-purple-600 before:top-[100%] before:left-[0] before:transform-[scaleX(0)] lg:text-9xl before:content-[""] dark:text-neutral-400 font-alan text-center mb-10 text-6xl'>
        <span className="text-sky-600 dark:text-violet-700 font-victor italic">Be</span>{ window.innerWidth < 700 && <br /> }Focused
      </h1>
      <ul className="flex flex-col lg:flex-row md:flex-row justify-center items-center gap-10 w-[60%]">
        <li>
          <Link
            to={"/auth/sign-up"}
            className="p-3 bg-sky-500 rounded-2xl font-medium text-2xl shadow-md dark:bg-violet-600 dark:text-white font-alan"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            to={"/auth/log-in"}
            className="p-3 bg-sky-500 rounded-2xl font-medium text-2xl shadow-md dark:bg-violet-600 dark:text-white font-alan"
          >
            Log In
          </Link>
        </li>
      </ul>
    </main>
  );
};
