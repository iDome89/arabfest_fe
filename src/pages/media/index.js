import { Hero } from "../../components/Hero";
import {NavbarSecondaryPages} from "../../components/NavbarSecondaryPages";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      <NavbarSecondaryPages />
      <section>
        <Hero />
      </section>
    </main>
  );
}
