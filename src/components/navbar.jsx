import { ClipboardList, Moon, Sun } from "lucide-react";

const Navbar = ({ isLight, setIsLight }) => {
  return (
    <nav className="border-b border-slate-300 bg-[#EFE9E3] dark:border-white/20 dark:bg-[#000000]">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-2 text-base font-semibold dark:text-white">
          <ClipboardList /> TO-DO LIST
        </div>
        <div>
          <button
            onClick={() => setIsLight((prev) => !prev)}
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {isLight ? (
              <Sun className="w-6 h-6 text-amber-500" />
            ) : (
              <Moon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
