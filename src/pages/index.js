import { About } from "../components/About";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { News } from "../components/News";
import { Reservations } from "../components/Reservations";
import { Schedule } from "../components/Schedule";
import { Sponsors } from "../components/Sponsors";
import { Media } from "../components/Media";
import { Team } from "../components/Team";
import Contact from "@/components/Contact";
import { Gallery } from "@/components/Gallery";
import { useGetAll } from "@/features/useGetAll";
import SkeletonLayout from "@/components/Skeleton";
import { Organization } from "@/components/Organization";

export default function Home() {
  const { isLoading } = useGetAll();
  if (isLoading) {
    return <SkeletonLayout />;
  }
  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <section>
        <Hero />
      </section>
      <section id="novinky">
        <News />
      </section>
      <section id="o festivalu">
        <About />
      </section>
      <section id="program">
        <Schedule />
      </section>
      <section id="galerie">
        <Gallery />
      </section>
      <section id="tým">
        <Team />
      </section>
      <section id="media">
        <Media />
      </section>
      <section id="partneři">
        <Sponsors />
      </section>
      <section id="organization">
        <Organization />
      </section>
      <section id="kontakt">
        <Contact />
        <Reservations />
      </section>
      <Footer />
    </main>
  );
}
