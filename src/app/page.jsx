import styles from "./page.module.css";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel";
import FeaturesBar from "../components/FeaturesBar/FeaturesBar";
import CategoryShowcase from "../components/CategoryShowcase/CategoryShowcase";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import Testimonials from "../components/Testimonials/Testimonials";

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroCarousel />
      <FeaturesBar />
      <CategoryShowcase />
      <NewArrivals />
      <Testimonials />
      <main className={styles.main}>{/* Conteúdo futuro aqui */}</main>
    </div>
  );
}
