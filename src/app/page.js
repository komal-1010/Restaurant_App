import styles from "./page.module.css";
import Restaurantpage from "./restaurant/page";

export default function Home() {
  return (
    <main className={styles.main}>
    <Restaurantpage/>
    </main>
  );
}
