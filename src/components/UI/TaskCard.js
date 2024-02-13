import styles from "./TaskCard.module.css";

import { useState } from "react";
import { style } from "../../modal-style";
import PrimaryDialog from "./PrimaryDialog";

// 3rd party packages
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { homepageActions } from "../../redux/homepage-slice";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const TaskCard = ({
  idProp,
  titleProp,
  descriptionProp,
  priorityProp,
  dateProp,
  statusProp,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const [priority, setPriority] = useState("");
  const [completed, setCompleted] = useState(statusProp);
  const [date, setDate] = useState(dayjs(new Date()));
  const [textError, setTextError] = useState(false);

  const taskData = useSelector((state) => state.homepage.tasks);

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

  const updateHandler = () => {
    if (priority && date) {
      const data = {
        id: idProp,
        title: editData.title,
        description: editData.description,
        priority,
        date: date.format("DD-MM-YYYY"),
      };

      let newData = [];
      taskData.map((task) => {
        if (task.id === idProp) {
          newData.push(data);
        } else {
          newData.push(task);
        }
      });

      dispatch(homepageActions.setTasks(newData));
      dispatch(homepageActions.increaseID());
      localStorage.setItem("todoData", JSON.stringify(newData));
      setPriority(null);
      setEdit(false);
      setTextError(false);
    } else {
      setTextError(true);
    }
  };

  const updateStatus = () => {
    const data = {
      id: idProp,
      title: titleProp,
      description: descriptionProp,
      priority: priorityProp,
      status: !completed,
      date: dateProp,
    };

    let newData = [];
    taskData.map((task) => {
      if (task.id === idProp) {
        newData.push(data);
      } else {
        newData.push(task);
      }
    });

    if (completed) {
      setCompleted(!completed);
      dispatch(homepageActions.setTasks(newData));
      localStorage.setItem("todoData", JSON.stringify(newData));
      dispatch(homepageActions.decreaseCompletedTask());
    } else {
      setCompleted(!completed);
      dispatch(homepageActions.setTasks(newData));
      localStorage.setItem("todoData", JSON.stringify(newData));
      dispatch(homepageActions.increaseCompletedTask());
    }
  };

  return (
    <>
      <div className={`${styles.container} ${priorityClass}`}>
        <div className={styles.s1}>
          <p className={styles.title}>{titleProp}</p>
          <div className={styles.btns}>
            <Checkbox
              checked={completed}
              onChange={updateStatus}
              inputProps={{ "aria-label": "controlled" }}
              color="success"
            />
            <MoreVertIcon
              className={styles.moreIcon}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>

        <div
          className={`${styles.cardDetailsContainer} ${
            isOpen ? styles.cardHide : ""
          }`}
        >
          <p className={styles.des}>
            {descriptionProp && descriptionProp.length > 500
              ? `${descriptionProp.substring(0, 500)}...`
              : descriptionProp}
          </p>
          <p className={styles.date}>Date: {dateProp}</p>
          <p className={styles.priority}>Priority: {priorityProp}</p>
          <Button
            className={styles.editBtn}
            variant="contained"
            onClick={() => editHandler(idProp)}
          >
            Edit
          </Button>
          <Button
            className={styles.editBtn}
            variant="contained"
            onClick={() => deleteHandler(idProp)}
          >
            Delete
          </Button>
        </div>
      </div>

      <PrimaryDialog open={edit} setOpen={setEdit}>
        <Box sx={style}>
          <p className={styles.addTitle}>Edit Task</p>
          {textError && (
            <p className={styles.errorTxt}>Please complete the form!</p>
          )}
          <div className={styles.inputCon}>
            <input
              type="text"
              className={styles.input}
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
            <input
              type="text"
              className={styles.input}
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
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
              label="Edit"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
            </Select>
          </FormControl>

          <p className={styles.updateBtn} onClick={updateHandler}>
            Update
          </p>
        </Box>
      </PrimaryDialog>
    </>
  );
};

export default TaskCard;
