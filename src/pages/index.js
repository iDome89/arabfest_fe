import { About } from "../components/About";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { News } from "../components/News";
import { Reservations } from "../components/Reservations";
import { Schedule } from "../components/Schedule";
import { Sponsors } from "../components/Sponsors";
import { Team } from "../components/Team";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col bg-transparent`}
    >
      <Navbar />
      <Hero />
      <News />
      <About />
      <Team />
      <Schedule />
      <Sponsors />
      <Reservations />
      <Footer />
    </main>
  );
}
