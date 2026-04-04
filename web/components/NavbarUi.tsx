import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

export default function NavbarUi() {
  return (
    <div className="flex w-screen justify-between items-center gap-20 p-4">
      <div className="flex w-screen">
        <Link href={"/"}>Admin Panel</Link>
      </div>
      <div className="flex w-full justify-end gap-5">
        <Button variant={"outline"} className="rounded-md">
          Home
        </Button>
        <Button variant={"outline"} className="rounded-md">
          About Us
        </Button>
        <Button variant={"outline"} className="rounded-md">
          Price
        </Button>
        <div className="h-10 w-[1] bg-slate-300 dark:bg-slate-800 mx-2" />
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" className="rounded-md border w-20 border-gray-200">
              Start Now
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-3xl p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">
              {/* Left Side: Sign In */}
              <div className="flex-1 p-8">
                <DialogHeader className="items-center text-center mb-6">
                  <DialogTitle className="text-2xl font-bold tracking-tight">Welcome Back</DialogTitle>
                  <DialogDescription>Access your owner dashboard.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 ">
                  <Link href={"/form/login"} className="flex justify-center items-center h-7 rounded-2xl w-full border-2 border-red-200">
                    Sign In
                  </Link>
                </div>
              </div>

              {/* Visual Separator for Desktop */}
              <div className="hidden md:block w-[1] bg-border my-8" />

              {/* Right Side: Sign Up */}
              <div className="flex-1 p-8 bg-slate-50/50">
                <DialogHeader className="items-center text-center mb-6">
                  <DialogTitle className="text-2xl font-bold tracking-tight">New Business</DialogTitle>
                  <DialogDescription>Register a new Business account.</DialogDescription>
                </DialogHeader>

                <div className="space-y-10 ">
                  {/* Put your input fields here later */}
                  <Link href={"/form/signUp"} className="flex justify-center items-center h-7 rounded-2xl w-full border-2 border-red-200">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
