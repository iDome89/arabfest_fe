import { About } from "../components/About";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { News } from "../components/News";
import { Reservations } from "../components/Reservations";
import { Schedule } from "../components/Schedule";
import { Sponsors } from "../components/Sponsors";
import { Team } from "../components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="news">
        <News />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="team">
        <Team />
      </section>
      <section id="events">
        <Schedule />
      </section>
      <section id="sponsors">
        <Sponsors />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="reservations">
        <Reservations />
      </section>
      <Footer />
    </main>
  );
}
