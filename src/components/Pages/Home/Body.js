import { useEffect, useState } from "react";
import TaskCard from "../../UI/TaskCard";
import styles from "./Body.module.css";
import { style } from "../../../modal-style";
import { homepageActions } from "../../../redux/homepage-slice";

// 3rd Party Components
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import PrimaryDialog from "../../UI/PrimaryDialog";

const Body = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [textError, setTextError] = useState(false);
  const [taskDisplay, setTaskDisplay] = useState([]);

  const [priority, setPriority] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(dayjs(new Date()));

  const taskData = useSelector((state) => state.homepage.tasks);
  const id = useSelector((state) => state.homepage.id);

  console.log(taskDisplay, "TASKDIS");
  console.log(taskData, "TASKDat");

  const submitHandler = () => {
    if (title && description && priority && date) {
      const data = {
        id,
        title,
        description,
        priority,
        date: date.format("DD-MM-YYYY"),
        status: false,
      };

      const newData = [...taskData, data];
      console.log(newData);

      dispatch(homepageActions.setTasks(newData));
      dispatch(homepageActions.increaseID());
      const newDataJSON = JSON.stringify(newData);
      localStorage.setItem("todoData", newDataJSON);
      setPriority(null);
      setTitle(null);
      setDescription(null);
      setDate(dayjs(new Date()));
      setTextError(false);
      setOpen(false);
    } else {
      setTextError(true);
    }
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
  useEffect(() => {
    if (sort === "") {
      setTaskDisplay(taskData);
    } else if (sort === "name") {
      const temp = [...taskData];
      temp.sort((a, b) => a.title.localeCompare(b.title));
      setTaskDisplay(temp);
    } else if (sort === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      const temp = [...taskData];
      temp.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
      setTaskDisplay(temp);
    } else if (sort === "date") {
      const temp = [...taskData];
      temp.sort((a, b) => a.date.localeCompare(b.date));
      setTaskDisplay(temp);
    }
  }, [sort, taskData]);

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
            dateProp={task.date}
            statusProp={task.status}
          />
        ))}
      </div>

      {/* Add Task Modal */}
      <PrimaryDialog open={open} setOpen={setOpen}>
        <Box sx={style}>
          <p className={styles.addTitle}>Add Task</p>
          {textError && (
            <p className={styles.errorTxt}>Please complete the form!</p>
          )}
          <div className={styles.inputCon}>
            <input
              type="text"
              placeholder="Title"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.dateCon}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  className={styles.datePicker}
                  label="Date"
                  value={date}
                  onChange={(value) => setDate(value)}
                  format="DD-MM-YYYY"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              className={styles.priority}
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
      </PrimaryDialog>
    </>
  );
};

export default Body;
