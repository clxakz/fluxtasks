import { ReactNode } from "react";
import Dock from "./dock";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      {/* Titlebar */}
      <div id="titlebar" className="h-6" />

      <main className="p-2 flex flex-col grow justify-between overflow-hidden">
        { children }
        <Dock />
      </main>
    </div>
  );
}
