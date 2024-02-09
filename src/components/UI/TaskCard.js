import styles from "./TaskCard.module.css";

import { useState } from "react";

// 3rd party packages
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

const TaskCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.div transition={{ duration: 0.5 }} className={styles.container}>
        <motion.div layout="position" className={styles.s1}>
          <p className={styles.title}>
            Data Structures and Algorithm Assignment
          </p>
          <div className={styles.btns}>
            <Switch defaultChecked color="success" />
            <MoreVertIcon
              className={styles.moreIcon}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </motion.div>

        {isOpen && (
          <motion.div layout="position">
            <p className={styles.des}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              efficitur mi sed tincidunt facilisis. Sed semper id ante quis
              iaculis. Nam augue dolor, pulvinar ac convallis sit amet,
              fermentum et dolor. Etiam ut tempor dolor. Etiam rhoncus molestie
              felis sit amet finibus. Mauris vel libero elit. Nulla at dui
              risus. Interdum et malesuada fames ac ante ipsum primis i
            </p>
            <Button className={styles.editBtn} variant="contained">
              Edit
            </Button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default TaskCard;
