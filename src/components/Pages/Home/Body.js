import { useEffect, useState } from "react";
import TaskCard from "../../UI/TaskCard";
import styles from "./Body.module.css";
import { style } from "../../../modal-style";

// 3rd Party Components
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { homepageActions } from "../../../redux/homepage-slice";

const Body = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [taskDisplay, setTaskDisplay] = useState([]);

  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const taskData = useSelector((state) => state.homepage.tasks);
  const id = useSelector((state) => state.homepage.id);

  const submitHandler = () => {
    const data = {
      id,
      title,
      description,
      priority,
    };

    const newData = [...taskData, data];

    dispatch(homepageActions.setTasks(newData));
    dispatch(homepageActions.increaseID());
    setPriority("");
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  // Filter Implementation
  useEffect(() => {
    if (filter === "") {
      setTaskDisplay(taskData);
    } else {
      const temp = taskData.filter((item) => item.priority === filter);
      setTaskDisplay(temp);
    }
  }, [filter, taskData]);

  // Sort Implementation
  useEffect(() => {}, [sort, taskData]);

  return (
    <>
      <div className={styles.addBtnCon} onClick={() => setOpen(true)}>
        <AddCircleIcon className={styles.addBtn} />
      </div>

      <div className={styles.sort_filter}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label="Sort"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="name">By Name</MenuItem>
            <MenuItem value="date">By Date</MenuItem>
            <MenuItem value="priority">By Proiority</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={styles.tasks}>
        {taskDisplay.map((task) => (
          <TaskCard
            key={task.id}
            idProp={task.id}
            titleProp={task.title}
            descriptionProp={task.description}
            priorityProp={task.priority}
          />
        ))}
      </div>

      {/* Add Task Modal */}
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
              label="Add"
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
