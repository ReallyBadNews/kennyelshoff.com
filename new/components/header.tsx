import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="container">
      <div className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex flex-col space-y-1 text-sm leading-none">
            <span className="text-lg font-bold">kenny</span>
            <span>design engineer</span>
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="ghost">Hello</Button>
          <Button variant="outline">World</Button>
        </div>
      </div>
    </header>
  );
}
