import styles from "./Header.module.css";
import Card from "./UI/Card";

const Header = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sec1}>
          <p className={styles.welcomeTxt}>Hey Mujtahid!</p>
          <p>{formattedDate}</p>
        </div>
        <div className={styles.sec2}>
          <Card name="Total Tasks" num={5} />
          <Card name="Completed Tasks" num={2} />
        </div>
      </div>
    </>
  );
};

export default Header;
