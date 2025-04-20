"use client";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const handlePayement = async () => {
    window.location.href =
      "https://club.lebusinessclubcmda.com/noMember/memberShip";
  };

  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden">
      <div className="relative mt-8 ml-4 md:mt-16 md:ml-20">
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-48 h-auto md:w-[333px] md:h-[24px]"
        />
      </div>

      <div className="absolute right-0 top-0 w-1/2 h-full z-0 hidden md:block">
        <img
          src={"/images/reservedMember.png"}
          alt="backgroundImg"
          className="h-full w-full object-cover rounded-b-full"
        />
      </div>
      <main className="relative z-10 flex items-center justify-center px-6 py-24">
        <div className="bg-white shadow-lg p-10 rounded-lg max-w-lg text-center">
          <div className="mb-4">
            <img
              src={"/icons/icon/locked-window.svg"}
              className="h-10 w-10 mx-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            Espace réservé aux membres
          </h2>
          <p className="text-g[#343333] mb-6">
            Rejoignez notre communauté pour accéder à du contenu exclusif, à des
            ressources stratégiques et pour échanger avec des experts de
            référence.
          </p>
          <button
            className="bg-white border-2 border-[#C19F72] text-[#030303] px-6 py-2 rounded shadow hover:bg-[#FDF7F0] font-medium flex items-center gap-2 mx-auto"
            onClick={handlePayement}
          >
            Rejoindre le Club
            <Star className="w-4 h-4 text-[#C19F72]" />
          </button>
          <p className="text-sm mt-6 text-[#030303] font-500">
            Vous avez une question ?{" "}
            <a
              href="https://club.lebusinessclubcmda.com/noMember/NousContacter"
              className="text-[#C19F72] underline font-bold"
            >
              Contactez notre équipe
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
