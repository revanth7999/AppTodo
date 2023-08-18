import { Button, Input } from "antd";
import React, { useState } from "react";
import logo from "../assets/to-do-list.png";
import { Checkbox } from "antd";
import { DeleteTwoTone, InfoCircleTwoTone } from "@ant-design/icons";
import moment from "moment/moment";
import "../components/Landing.css";

export default function Landing() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const sendTaskToList = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          text: newTask,
          completed: false,
          capturedTime: moment().format("Do MMM YYYY"),
        },
      ]);
      setNewTask("");
      console.log(tasks);
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  return (
    <>
      <div>
        <img src={logo} alt="Logo" height={50} />
      </div>
      <div className="InButton">
        <Input
          placeholder="Add new.."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="Textbox"
        />
        <Button type="primary" size={20} onClick={sendTaskToList}>
          ADD
        </Button>
      </div>

      {tasks.map((task, index) => (
        <div className="Map-parent">
          <div>
            {!task.completed && (
              <Checkbox onClick={() => completeTask(index)} />
            )}
          </div>
          <text
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
          </text>

          <div>
            <div className="Delete-icon">
              <DeleteTwoTone
                twoToneColor="red"
                onClick={() => removeTask(index)}
              />
            </div>
            <div>
              <InfoCircleTwoTone />
              <text style={{ fontSize: 12 }}>{task.capturedTime}</text>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
