import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Grid,
  TextField,
  TextareaAutosize,
  SelectChangeEvent,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PioritySelect } from "../src/constant";
import axios from "axios";
import { updateStateLoading } from "./actions";
import { useToDoListContext } from "./selectors";

export default function FormCreateComponent() {
  const { state: stateToDoList, dispatch: dispatchToDoList } =
    useToDoListContext();
  const [inputTitle, setInputTitle] = React.useState<string>("");
  const [inputDesciption, setInputDesciption] = React.useState<string>("");
  const [dueDate, setDueDate] = React.useState<Dayjs | null>(dayjs(new Date()));

  const [Piority, setPiority] = React.useState("2");

  const handleSelectPiority = (event: SelectChangeEvent) => {
    setPiority(event.target.value as string);
  };

  const onChangeInputTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setInputTitle(e.target.value);
  };

  const onChangeInputDesciption = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setInputDesciption(e.target.value);
  };

  const createTaskFn = async () => {
    dispatchToDoList(updateStateLoading(true));
    try {
      const createTask = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_HOST_BACKEND}/to-do-list`,
        data: {
          title: inputTitle,
          description: inputDesciption,
          priority: Number(Piority),
          dueDate: dueDate,
        },
      });
    } catch (error) {
      console.log("loi me roi");
    }
    dispatchToDoList(updateStateLoading(false));
  };

  return (
    <Box sx={{}}>
      <Box
        sx={{ textAlign: "center", fontSize: 20, fontWeight: 700, mb: "2rem" }}
      >
        New Task
      </Box>
      <TextField
        id="text-field-title"
        fullWidth
        sx={{}}
        required={true}
        value={inputTitle}
        onChange={onChangeInputTitle}
        placeholder={"Add new task..."}
        variant="outlined"
      />
      <Box
        sx={{
          fontWeight: 700,
          mt: "1.5rem",
        }}
      >
        Description
      </Box>
      <TextareaAutosize
        minRows={5}
        style={{ width: "100%", maxWidth: "100%", marginBottom: "1rem" }}
        value={inputDesciption}
        onChange={onChangeInputDesciption}
      />
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        columns={2}
        spacing={2}
        sx={{}}
      >
        <Grid item xs={1} sm={1} md={1} sx={{}}>
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            Due Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dueDate}
              minDate={dayjs(new Date())}
              format="DD MM YYYY"
              onChange={(newValue) => setDueDate(newValue)}
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={1} sm={1} md={1} sx={{}}>
          <Typography
            sx={{
              fontWeight: 700,
            }}
          >
            Piority
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="select-task"
              id="simple-select"
              value={Piority}
              onChange={handleSelectPiority}
            >
              {PioritySelect.map((value, index) => (
                <MenuItem
                  key={`item-piority-${index}`}
                  value={String(index + 1)}
                >
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        sx={{ bgcolor: "green", mt: "2rem" }}
        onClick={createTaskFn}
        disabled={stateToDoList.isLoadingPage}
      >
        Add
      </Button>
    </Box>
  );
}
