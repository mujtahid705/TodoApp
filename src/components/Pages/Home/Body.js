import TaskCard from "../../UI/TaskCard";
import styles from "./Body.module.css";

// 3rd Party Components
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Body = () => {
  return (
    <>
      <div className={styles.addBtnCon}>
        <AddCircleIcon className={styles.addBtn} />
      </div>

      <div>
        <TaskCard />
      </div>
    </>
  );
};

export default Body;
