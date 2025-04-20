"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ReservedForVisitor = () => {
  const router = useRouter();
  const handleSignUp = () => {
    router.push("/inscription");
  };
  const handleSignIn = () => {
    router.push("/login");
  };
  return (
    <div className="flex w-full h-full bg-[url('/images/reservedMember.png')] bg-cover bg-center items-center justify-center">
      <div className="w-full max-w-[955px] h-auto object-contain p-4 sm:p-6 md:p-8">
        <div className="flex relative flex-col items-center py-10 pr-10 pl-20 min-h-[455px] rounded-[29px] shadow-[0px_0px_20px_rgba(0,0,0,0.25)] max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/90ecf69d74d69928c0bb1dc6d1c3634caef92dd4881c0c6a4937e6a2d3503bcf?placeholderIfAbsent=true&apiKey=a414ba2128934c9eaf80989d63383fb4"
            alt=""
            className="object-cover absolute inset-0 size-full"
          />
          <div className="relative text-5xl font-semibold leading-[70px] w-[631px] text-center max-md:max-w-full max-md:text-4xl max-md:leading-[65px]">
            Espace réservé aux <br />
            membres
          </div>
          <div className="relative mt-5 font-bold">
            Vous n'avez pas de compte
          </div>

          <button
            className="flex relative flex-col justify-center items-center px-16 py-3 mt-5 max-w-full whitespace-nowrap bg-white rounded-lg border-2 border-solid border-stone-400 shadow-[0px_0px_20px_rgba(0,0,0,0.25)] text-stone-400 w-[423px] max-md:px-5"
            tabIndex={0}
            aria-label="S'inscrire"
            onClick={handleSignUp}
          >
            <div className="flex gap-5 justify-between max-w-full w-[168px]">
              <div className="text-primary">S'inscrire</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3e7d553c16c6c045d75c1e84b76296806cee93ad3485933b1599a99f851ca7e?placeholderIfAbsent=true&apiKey=a414ba2128934c9eaf80989d63383fb4"
                alt=""
                className="object-contain shrink-0 my-auto w-6 aspect-square"
              />
            </div>
          </button>

          <div className="relative mt-5 text-stone-400">
            <span className="leading-6 text-neutral-900 font-bold">
              J'ai déjà un compte ?
            </span>
            <button
              className="leading-6 text-stone-400 text-red-500"
              tabIndex={0}
              aria-label="Se connecter"
              onClick={handleSignIn}
            >
              <div className="text-primary"> Se connecter</div>
            </button>
          </div>
          <div className="relative mt-10">
            <img
              src={"/images/logo.png"}
              alt="logo"
              className="w-[333px] h-[24px] max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservedForVisitor;
