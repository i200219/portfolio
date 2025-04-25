'use client';

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import Nav from "./Nav";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="text-white">
        <AlignJustify className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent className="bg-[#1c1c1c] border-[#3ba8ae]/20">
        {/* Adding a visually hidden title for accessibility */}
        <div className="sr-only">Mobile Navigation</div>
        
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Nav containerStyles="flex flex-col gap-y-6 items-center" linkStyles="text-2xl" />
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <Button className="bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 transition-all">
              Hire me
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
