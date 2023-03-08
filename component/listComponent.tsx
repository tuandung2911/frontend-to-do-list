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
import {
  updateStateCheckBox,
  updateStateLoading,
  updateStateTaskOpenDetail,
} from "./actions";
import BulkAcionComponent from "./bulkActionComponent";

export default function ListComponent() {
  const search = new jsSearch.Search("_id");
  search.addIndex("title");

  const { state: stateToDoList, dispatch: dispatchToDoList } =
    useToDoListContext();
  const [inputSearch, setInputSearch] = React.useState<string>("");
  const [dataState, setDataState] = React.useState<responseList[]>([]);

  const handleSelectPiority = (event: SelectChangeEvent, id: string) => {
    dataState.find((v) => {
      if (v._id == id) {
        v.priority = Number(event.target.value as string);
      }
    });
    setDataState([...dataState]);
  };

  const onChangeInputTitle = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => {
    e.preventDefault();
    dataState.find((v) => {
      if (v._id == id) {
        v.title = e.target.value;
      }
    });
    setDataState([...dataState]);
  };

  const onChangeInputDesciption = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => {
    e.preventDefault();
    dataState.find((v) => {
      if (v._id == id) {
        v.description = e.target.value;
      }
    });
    setDataState([...dataState]);
  };

  const handleInputSearch = (event: React.ChangeEvent<any>) => {
    setInputSearch(event.target.value);
  };

  const getData = async () => {
    const resp = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_HOST_BACKEND}/to-do-list`,
    });
    setDataState(resp.data);
    localStorage.setItem(storageNameList, JSON.stringify(resp.data));
  };

  const updateTask = async (id: string) => {
    dispatchToDoList(updateStateLoading(true));

    const data = dataState.find((v) => v._id == id);
    await axios({
      method: "patch",
      url: `${process.env.NEXT_PUBLIC_HOST_BACKEND}/to-do-list/${id}`,
      data: {
        title: data?.title,
        description: data?.description,
        priority: data?.priority,
        dueDate: data?.dueDate,
      },
    });
    dispatchToDoList(updateStateLoading(false));
  };

  const deleteTask = async (id: string) => {
    dispatchToDoList(updateStateLoading(true));
    await axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_HOST_BACKEND}/to-do-list/${id}`,
    });

    const searchTask = stateToDoList.arrCheckBox.findIndex((v) => v == id);
    if (searchTask > -1) {
      // neu co trong arr thi xoa
      stateToDoList.arrCheckBox.splice(searchTask, 1);
      dispatchToDoList(updateStateCheckBox([...stateToDoList.arrCheckBox]));
    } 

    dispatchToDoList(updateStateLoading(false));
  };

  const deleteAllCheckbox = async () => {
    dispatchToDoList(updateStateLoading(true));
    await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_HOST_BACKEND}/to-do-list/delete-by-array-id`,
      data: {
        ids: stateToDoList.arrCheckBox,
      },
    });

    stateToDoList.arrCheckBox.length = 0;
    dispatchToDoList(updateStateLoading(false));
  };

  React.useEffect(() => {
    dispatchToDoList(updateStateLoading(true));
    getData();
    dispatchToDoList(updateStateLoading(false));
  }, []);

  React.useEffect(() => {
    if (inputSearch.length > 0) {
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

  const pushToArrCheckbox = (id: string) => {
    const searchTask = stateToDoList.arrCheckBox.findIndex((v) => v == id);
    if (searchTask > -1) {
      // neu co trong arr thi xoa
      stateToDoList.arrCheckBox.splice(searchTask, 1);
      dispatchToDoList(updateStateCheckBox([...stateToDoList.arrCheckBox]));
    } else {
      // k co thi set vao arr
      dispatchToDoList(updateStateCheckBox([...stateToDoList.arrCheckBox, id]));
    }
  };

  React.useEffect(() => {
    if (!stateToDoList.isLoadingPage) {
      getData();
    }
  }, [stateToDoList.isLoadingPage]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          py: 3,
          px: {
            xs: 2,
            md: 3,
            lg: 5,
          },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: 700,
            mb: "2rem",
          }}
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
                sx={{ border: "1px solid black", mb: 2 }}
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
                      control={
                        <Checkbox
                          checked={
                            stateToDoList.arrCheckBox.find(
                              (v) => v == value._id
                            )
                              ? true
                              : false
                          }
                          onChange={() => pushToArrCheckbox(value._id)}
                        />
                      }
                      label={value.title}
                    />
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      alignItems="center"
                      justifyContent={"space-between"}
                      gap={2}
                    >
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#89CFF0", px: 3 }}
                        onClick={() => pushTaskToArrOpenDetail(value._id)}
                        disabled={stateToDoList.isLoadingPage}
                      >
                        Detail
                      </Button>
                      <Button
                        onClick={() => deleteTask(value._id)}
                        variant="contained"
                        sx={{ bgcolor: "#F24740" }}
                        disabled={stateToDoList.isLoadingPage}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    p: {
                      xs: 2,
                      sm: 3,
                    },
                  }}
                >
                  <TextField
                    id="text-field-title"
                    fullWidth
                    sx={{}}
                    required={true}
                    value={value.title}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      onChangeInputTitle(e, value._id)
                    }
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
                    value={value.description ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      onChangeInputDesciption(e, value._id)
                    }
                  />

                  <Grid
                    container
                    direction={{ xs: "column", sm: "row" }}
                    columns={2}
                    spacing={2}
                    sx={{}}
                  >
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
                          value={dayjs(new Date(value.dueDate))}
                          minDate={dayjs(new Date())}
                          format="DD MM YYYY"
                          onChange={(newValue) => {
                            dataState.find((v) => {
                              if (v._id == value._id) {
                                v.dueDate = String(newValue);
                              }
                            });
                            setDataState([...dataState]);
                          }}
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
                          value={String(value.priority)}
                          onChange={(e: SelectChangeEvent) =>
                            handleSelectPiority(e, value._id)
                          }
                        >
                          {PioritySelect.map((Item, index) => (
                            <MenuItem
                              key={`item-piority-${index}`}
                              value={String(index + 1)}
                            >
                              {Item}
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
                    onClick={() => updateTask(value._id)}
                    disabled={stateToDoList.isLoadingPage}
                  >
                    Update
                  </Button>
                </AccordionDetails>
              </Accordion>
            ))}

          {dataState.length <= 0 && <Box>No result</Box>}
        </Box>
      </Box>
      {stateToDoList.arrCheckBox.length > 0 && (
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <BulkAcionComponent onClickRemove={deleteAllCheckbox} />
        </Box>
      )}
    </Box>
  );
}
