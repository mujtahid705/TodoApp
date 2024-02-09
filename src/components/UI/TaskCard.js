import styles from "./TaskCard.module.css";

import { useState } from "react";
import { style } from "../../modal-style";

// 3rd party packages
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { homepageActions } from "../../redux/homepage-slice";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";

const TaskCard = ({ id, titleProp, descriptionProp, priorityProp }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  let priorityClass;
  switch (priorityProp) {
    case "High":
      priorityClass = styles.highPriority;
      break;
    case "Medium":
      priorityClass = styles.mediumPriority;
      break;
    case "Low":
      priorityClass = styles.lowPriority;
      break;
    default:
      priorityClass = "";
  }

  const temp = useSelector((state) => state.homepage.tasks);
  const editHandler = (id) => {
    const data = temp.filter((item) => item.id === id);
    setEditData(data[0]);
    setEdit(true);
  };

  const deleteHandler = (id) => {
    dispatch(homepageActions.deleteTask(id));
  };

  return (
    <>
      <motion.div
        transition={{ duration: 0.5 }}
        className={`${styles.container} ${priorityClass}`}
      >
        <motion.div layout="position" className={styles.s1}>
          <p className={styles.title}>{titleProp}</p>
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
            <p className={styles.des}>{descriptionProp}</p>
            <p>Priority: {priorityProp}</p>
            <Button
              className={styles.editBtn}
              variant="contained"
              onClick={() => editHandler(id)}
            >
              Edit
            </Button>
            <Button
              className={styles.editBtn}
              variant="contained"
              onClick={() => deleteHandler(id)}
            >
              Delete
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Edit Task Modal */}
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Edit Task</p>
          <div>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              label="Age"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
            </Select>
          </FormControl>

          <p className={styles.submitBtn}>Update</p>
        </Box>
      </Modal>
    </>
  );
};

export default TaskCard;
