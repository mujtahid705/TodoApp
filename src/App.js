import styles from "./App.module.css";
import Body from "./components/Pages/Home/Body";
import Header from "./components/Pages/Home/Header";

function App() {
  return (
    <div className={styles.app}>
      <p className={styles.appName}>TodoApp</p>
      <Header />
      <Body />
    </div>
  );
}

export default App;
