import { Button } from "./ui/button";

export default function NavbarUi() {
  return (
    <div className="flex w-screen justify-between items-center gap-20 p-4">
      <div className="flex w-screen">Admin Panel</div>
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
        <Button variant={"outline"} className={" rounded-md"}>
          Start Now
        </Button>
      </div>
    </div>
  );
}
