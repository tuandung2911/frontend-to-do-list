import * as React from "react";
import * as jsSearch from "js-search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Stack } from "@mui/system";
import axios from "axios";
import {
  TextareaAutosize,
  SelectChangeEvent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PioritySelect, responseList, storageNameList } from "../src/constant";
import { useToDoListContext } from "./selectors";
import { updateStateTaskOpenDetail } from "./actions";

export default function ListComponent() {
  const search = new jsSearch.Search("_id");
  search.addIndex("title");

  const { state: stateToDoList, dispatch: dispatchToDoList } =
    useToDoListContext();
  const [inputSearch, setInputSearch] = React.useState<string>("");
  const [inputTitle, setInputTitle] = React.useState<string>("");
  const [inputDesciption, setInputDesciption] = React.useState<string>("");
  const [dueDate, setDueDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [dataState, setDataState] = React.useState<responseList[]>([]);
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

  const handleInputSearch = (event: React.ChangeEvent<any>) => {
    setInputSearch(event.target.value);
  };

  const getData = async () => {
    const resp = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_HOST_BACKEND}/to-do-list`,
    });
    console.log("resp.data", resp.data);
    setDataState(resp.data);
    localStorage.setItem(storageNameList, JSON.stringify(resp.data));
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (inputSearch.length > 0) {
      console.log(
        search,
        search.search(inputSearch),
        "search.search(inputSearch)"
      );
      setDataState(search.search(inputSearch) as responseList[]);
    } else {
      setDataState(
        localStorage.getItem(storageNameList)
          ? JSON.parse(localStorage.getItem(storageNameList) || "[]")
          : []
      );
    }
  }, [inputSearch]);

  search.addDocuments(dataState);

  const pushTaskToArrOpenDetail = (id: string) => {
    const searchTask = stateToDoList.arrTaskOpenDetail.findIndex(
      (v) => v == id
    );
    if (searchTask > -1) {
      // neu co trong arr thi xoa
      stateToDoList.arrTaskOpenDetail.splice(searchTask, 1);
      dispatchToDoList(
        updateStateTaskOpenDetail([...stateToDoList.arrTaskOpenDetail])
      );
    } else {
      // k co thi set vao arr
      dispatchToDoList(
        updateStateTaskOpenDetail([...stateToDoList.arrTaskOpenDetail, id])
      );
    }
  };

  return (
    <Box sx={{}}>
      <Box
        sx={{ textAlign: "center", fontSize: 20, fontWeight: 700, mb: "2rem" }}
      >
        To Do List
      </Box>
      <TextField
        id="search-task"
        placeholder="Search..."
        onChange={handleInputSearch}
        value={inputSearch}
        fullWidth
        sx={{}}
      />
      <Box sx={{ overflow: "auto", height: "70vh", mt: 2 }}>
        {dataState &&
          dataState.map((value, index) => (
            <Accordion
              key={`item-task-${index}`}
              expanded={
                stateToDoList.arrTaskOpenDetail.find((v) => v == value._id)
                  ? true
                  : false
              }
              sx={{ border: "1px solid black" }}
            >
              <AccordionSummary
                sx={{
                  borderBottom: "1px solid black",
                }}
                aria-controls={`panel1a-content-${index}`}
                id={`panel1a-header-${index}`}
              >
                <Stack
                  direction={"row"}
                  alignItems="center"
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <FormControlLabel
                    control={<Checkbox defaultChecked={false} />}
                    label={value.title}
                  />
                  {stateToDoList.arrTaskOpenDetail.find((v) => v == value._id)
                    ? "true"
                    : "false"}
                  <Stack
                    direction={"row"}
                    alignItems="center"
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#89CFF0", px: 3 }}
                      onClick={() => pushTaskToArrOpenDetail(value._id)}
                    >
                      Detail
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: "#F24740" }}>
                      Remove
                    </Button>
                  </Stack>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
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
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    marginBottom: "1rem",
                  }}
                  value={inputDesciption}
                  onChange={onChangeInputDesciption}
                />
                <Grid container columns={2} spacing={2} sx={{}}>
                  <Grid item xs={2} sm={4} md={1} sx={{}}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Due Date
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "100%" }}
                        value={dueDate}
                        minDate={dayjs(new Date())}
                        format="DD MM YYYY"
                        onChange={(newValue) => setDueDate(newValue)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2} sm={4} md={1} sx={{}}>
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
                  // onClick={createTaskFn}
                >
                  Update
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}

        {!dataState && <Box>No result</Box>}
      </Box>
    </Box>
  );
}
