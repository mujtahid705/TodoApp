import styles from "./TaskCard.module.css";

const TaskCard = ({ name, num }) => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.name}>{name}</p>

        <div className={styles.numCon}>
          <p className={styles.num}>{num}</p>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
