import styles from "./Header.module.css";

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
        <p>ANother con</p>
      </div>
    </>
  );
};

export default Header;
