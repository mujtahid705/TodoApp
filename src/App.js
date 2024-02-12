import { useEffect } from "react";
import styles from "./App.module.css";
import Body from "./components/Pages/Home/Body";
import Header from "./components/Pages/Home/Header";
import { useDispatch } from "react-redux";
import { homepageActions } from "./redux/homepage-slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem("todoData");
    const id = localStorage.getItem("todoDataID");
    const completedTask = localStorage.getItem("todoDataCompletedTask");
    console.log(data);
    console.log(id);
    console.log(completedTask);
    {
      data && dispatch(homepageActions.setTasks(JSON.parse(data)));
    }
    {
      id && dispatch(homepageActions.setID(JSON.parse(id)));
    }
    {
      completedTask &&
        dispatch(homepageActions.setCompletedTask(JSON.parse(completedTask)));
    }
  }, []);

  return (
    <div className={styles.app}>
      <p className={styles.appName}>TodoApp</p>
      <Header />
      <Body />
    </div>
  );
}

export default App;
