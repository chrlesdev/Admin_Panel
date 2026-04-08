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
          <DialogTrigger className="rounded-md border border-gray-200 p-2 h-10 hover:bg-gray-100 mr-5 cursor-pointer">Start Now</DialogTrigger>

          <DialogContent className="max-w-3xl p-0 overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="flex flex-col md:flex-row border-b">
                <div className="flex-1 p-8">
                  <DialogHeader className="items-center text-center mb-6">
                    <DialogTitle className="text-xl font-bold tracking-tight text-slate-800">Welcome Back</DialogTitle>
                    <DialogDescription>Access your owner dashboard.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <Link href="/form/ownerLogin" className="flex justify-center items-center h-10 rounded-lg w-full border border-slate-300 hover:bg-slate-200 transition-colors font-medium text-sm">
                      Log In
                    </Link>
                  </div>
                </div>

                <div className="hidden md:block w-px bg-slate-200 my-8" />

                <div className="flex-1 p-8 bg-slate-50/50">
                  <DialogHeader className="items-center text-center mb-6">
                    <DialogTitle className="text-xl font-bold tracking-tight text-slate-800">New Business</DialogTitle>
                    <DialogDescription>Register a new account.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <Link href="/form/signUp" className="flex justify-center items-center h-10 rounded-lg w-full bg-slate-900 text-white hover:bg-slate-800 transition-colors font-medium text-sm mt-11">
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white">
                <div className="flex flex-col items-center justify-center text-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Internal System</h3>
                  <Link href="/form/adminLogin" className="text-sm font-medium text-slate-600 hover:text-slate-900 underline underline-offset-4">
                    Login as system admin →
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
