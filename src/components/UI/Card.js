import styles from "./Card.module.css";

const Card = ({ name, num }) => {
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

export default Card;
