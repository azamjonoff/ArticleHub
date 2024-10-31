// components
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";

// rrd

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="my-5 h-full flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
