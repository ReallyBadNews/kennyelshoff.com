import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Image from "next/image";
import profileImg from "@/public/images/profile.jpg";

export function Header() {
  return (
    <header className="container">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src={profileImg}
            alt="kenny"
            className="size-12 rounded-md"
            width={48}
            height={48}
            priority
          />
          <div className="flex flex-col space-y-1 text-sm leading-none">
            <span className="text-lg font-bold leading-none">kenny</span>
            <span>design engineer</span>
            {/* <span>design+code</span> */}
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <TwitterLogoIcon className="size-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <GitHubLogoIcon className="size-4" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
