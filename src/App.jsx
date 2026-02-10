import { Trash2, XIcon } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
} from "@mui/material";
import TodoCard from "./components/card";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [Open, setOpen] = useState(false);
  const [istitle, setIsTitle] = useState("");

  const [todoTitle, setTodoTitle] = useLocalStorage(istitle, []);

  const handleAddTitle = (e) => {
    e.preventDefault();

    if (!istitle.trim()) return;

    setTodoTitle([...todoTitle, { id: Date.now(), title: istitle, list: [] }]);

    setIsTitle("");
  };

  const handleUpdateList = (titleId, updatedList) => {
    setTodoTitle(
      todoTitle.map((title) =>
        title.id === titleId ? { ...title, list: updatedList } : title
      )
    );
  };

  const handleDeleteTitle = (idToRemove) => {
    setTodoTitle(todoTitle.filter((title) => title.id !== idToRemove));
  };

  const handleClearStorage = () => {
    localStorage.clear();
    setTodoTitle([]);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <main className="min-h-screen flex bg-[#F9F8F6] dark:bg-[#000000]">
      <div className="conatainer mx-auto p-6">
        <Card
          sx={{
            boxShadow: 7,
            width: 400,
            maxHeight: 700,
            display: "flex",
            flexDirection: "column"
          }}
          className="min-w-200"
        >
          <CardHeader
            action={
              <IconButton
                onClick={handleClearStorage}
                sx={{
                  color: "red",
                  "&:hover": {
                    background: "#FFD1D9",
                  },
                }}
              >
                <Trash2 />
              </IconButton>
            }
            title="To-do List"
            subheader="Track your to-do list"
            className="bg-linear-to-br from-blue-300 to-blue-500 pb-3 pt-3"
          />
          <CardContent sx={{ overflowY: "auto", flex: 1 }}>
            <div className="flex flex-col gap-4">
              {todoTitle.length === 0 ? (
                <Card
                  sx={{ height: 100 }}
                  className="flex items-center justify-center"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      No To-do List Yet!
                    </h2>
                  </div>
                </Card>
              ) : (
                todoTitle.map((title) => (
                  <TodoCard
                    key={title.id}
                    title={title}
                    onUpdateList={handleUpdateList}
                    onDelete={handleDeleteTitle}
                  />
                ))
              )}
            </div>
          </CardContent>
          <div className="sticky bottom-0 p-5 bg-inherit border-t-gray-400">
            <Button
              onClick={handleOpen}
              variant="outlined"
              sx={{ borderStyle: "dashed" }}
              className="w-full mb-4 justify-start"
            >
              Add To-do List
            </Button>
          </div>
          <Dialog open={Open} onClose={handleClose}>
            <DialogTitle>Add To-Do Title</DialogTitle>
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
              <form onSubmit={handleAddTitle}>
                <TextField
                  id="title"
                  value={istitle}
                  onChange={(e) => setIsTitle(e.target.value)}
                  required
                  margin="dense"
                  label="Todo List Title"
                  type="text"
                  name="title"
                  sx={{ width: 300 }}
                />
                <DialogActions>
                  <Button type="submit" variant="contained">
                    Add Title
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </main>
  );
}

export default App;
