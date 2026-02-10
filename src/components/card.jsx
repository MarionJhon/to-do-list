import {
  Card,
  CardContent,
  CardHeader,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./dropdown-menu.jsx";
import { MoreVertical, Plus, Trash2, XIcon } from "lucide-react";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.jsx";

const TodoCard = ({ title, onDelete, onUpdateList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isList, setIsList] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    if (!isList.trim()) return;

    const updatedList = [...title.list, { task: isList, done: false }];

    onUpdateList(title.id, updatedList); // ✅ sends updated list to App.jsx

    setIsList("");
  };

  const handleChange = (todoEvent) => {
    const updatedList = title.list.map((item, idx) =>
      idx === todoEvent ? { ...item, done: !item.done } : item
    );
    onUpdateList(title.id, updatedList);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 600,
          boxShadow: 2,
          "&:hover": {
            boxShadow: 5,
            animationDelay: 10,
          },
        }}
      >
        <CardHeader
          action={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  sx={{
                    width: 20,
                    height: 20,
                    minWidth: 0, // remove default min-width
                    borderRadius: "50%", // makes it fully circular
                    padding: 0,
                  }}
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="flex flex-col bg-white p-0"
              >
                <Button
                  onClick={handleOpen}
                  sx={{
                    textTransform: "none",
                    margin: 0,
                    color: "black",
                    justifyContent: "flex-start",
                    p: 1,
                    "&:hover": {
                      background: "#B4B4B4",
                    },
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add To-do
                </Button>
                <Button
                  onClick={() => onDelete(title.id)}
                  sx={{
                    textTransform: "none",
                    color: "red",
                    "&:hover": {
                      background: "#FFD1D9",
                    },
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete To-do
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          title={title.title}
        />
        <CardContent>
          {title.list.map((list, key) => (
            <FormGroup key={key}>
              <FormControlLabel
                onChange={() => handleChange(key)}
                control={
                  <Checkbox checked={list.done || false} name={list.task} />
                }
                label={
                  <span
                    style={{
                      textDecoration: list.done ? "line-through" : "none",
                      color: list.done ? "#999" : "inherit",
                    }}
                  >
                    {list.task}
                  </span>
                }
              />
            </FormGroup>
          ))}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Add To-Do List</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[800],
          })}
        >
          <XIcon className="h-6 w-6" />
        </IconButton>

        <DialogContent>
          <form onSubmit={handleAdd}>
            <TextField
              id="list"
              required
              value={isList}
              onChange={(e) => setIsList(e.target.value)}
              margin="dense"
              label="Todo List"
              type="text"
              name="list"
              sx={{ width: 300 }}
            />
            <DialogActions>
              <Button type="submit" variant="contained">
                Add List
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoCard;
