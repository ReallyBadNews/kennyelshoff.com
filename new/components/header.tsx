import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import Image from "next/image";
import profileImg from "@/public/images/profile.jpg";

export function Header() {
  return (
    <header className="container">
      <div className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src={profileImg}
            alt="kenny"
            className="size-12 rounded-md"
            width={40}
            height={40}
          />
          <div className="flex flex-col space-y-1 text-sm leading-none">
            <span className="text-lg font-bold leading-none">kenny</span>
            <span>design+code</span>
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <TwitterLogoIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <GitHubLogoIcon className="h-4 w-4" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
