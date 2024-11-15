"use client"
import Image from "next/image";

import { Button } from "../ui/button";
import Link from "next/link";
import NavCapsule from "./nav-link-capsule";
import { usePathname }from "next/navigation";
import { useState } from "react";
import MusicLoader from "./music-loader";


const NavController = () => {
  const [isMute, setIsMute] = useState(false);
  const pathname = usePathname();

  function handleDownload() {}
  function handleMute(){
    
  }
  return (
    <nav className=" z-10 flex flex-col fixed right-0 bg-moldy_green h-screen bg-opacity-60 w-64 items-center px-4 py-10">
      <Image
        src="/images/Joy Stick.png"
        width={75}
        height={75}
        alt="Controller Image"
      ></Image>
      <div className="flex flex-col gap-y-8 w-full mt-7">
        <h1 className="text-3xl text-white text-center font-bold">
          Content List
        </h1>
        <NavCapsule
          isActive={pathname  === "/result/state-awal" || pathname === "/result"}
          href="/result/state-awal"
          label="State Awal"
        ></NavCapsule>
        <NavCapsule isActive={pathname === "/result/state-akhir"} href="/result/state-akhir" label="State Akhir"></NavCapsule>
        <NavCapsule isActive= {pathname === "/result/deskripsi"} href="/result/deskripsi" label="Deskripsi"></NavCapsule>
      </div>

      <div className="flex flex-col w-full gap-y-8 mt-10">
        <h1 className="text-3xl text-white text-center font-bold">
          Action Button
        </h1>
        <Link href={"/result/video"}>
        <Button className="text-xl font-semibold py-4 bg-white w-full text-black flex flex-row gap-x-4">
          <h2>Video</h2>
        </Button>
        </Link>
        <Link href={"/"}>
          <Button className="text-xl font-semibold py-4 w-full bg-white text-black flex flex-row gap-x-4">
            <h2>Back To Menu</h2>
            <Image
              src="/images/Reload.svg"
              alt="Downoad Button"
              width={31}
              height={31}
              className="w-8 object-contain"
            ></Image>
          </Button>
        </Link>
      </div>
      <MusicLoader>
          
          </MusicLoader>
    </nav>
  );
};

export default NavController;
