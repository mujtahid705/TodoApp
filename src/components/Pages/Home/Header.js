import styles from "./Header.module.css";
import Card from "../../UI/Card";
import { useSelector } from "react-redux";

const Header = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();

  const taskData = useSelector((state) => state.homepage.tasks);
  const completed = useSelector((state) => state.homepage.completedTask);
  const userName = useSelector((state) => state.homepage.userName);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sec1}>
          <p className={styles.welcomeTxt}>
            Hey <span className={styles.name}>{userName}</span>!
          </p>
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <div className={styles.sec2}>
          <Card name="Total" num={taskData.length} />
          <Card name="Completed" num={completed} />
        </div>
      </div>
    </>
  );
};

export default Header;
