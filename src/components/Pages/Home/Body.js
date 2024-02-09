import { useState } from "react";
import TaskCard from "../../UI/TaskCard";
import styles from "./Body.module.css";

// 3rd Party Components
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Body = () => {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = () => {
    const data = {
      title,
      description,
      priority,
    };

    console.log(data);
    setPriority("");
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #4d4d4d",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };
  return (
    <>
      <div className={styles.addBtnCon} onClick={() => setOpen(true)}>
        <AddCircleIcon className={styles.addBtn} />
      </div>

      <div className={styles.tasks}>
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Add Task</p>
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

          <p className={styles.submitBtn} onClick={submitHandler}>
            Submit
          </p>
        </Box>
      </Modal>
    </>
  );
};

export default Body;
