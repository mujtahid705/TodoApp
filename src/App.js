import styles from "./App.module.css";
import Header from "./components/Header";

function App() {
  return (
    <div className={styles.app}>
      <p className={styles.appName}>TodoApp</p>
      <Header />
    </div>
  );
}

export default App;
