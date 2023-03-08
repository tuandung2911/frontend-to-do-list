import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, LinearProgress } from "@mui/material";
import ListComponent from "../component/listComponent";
import FormCreateComponent from "../component/formCreateComponent";
import ToDoListProvider from "../component/provider";
import { useToDoListContext } from "../component/selectors";

export default function Home() {
  const { state: stateToDoList, dispatch: dispatchToDoList } =
    useToDoListContext();
  return (
    <Box>
      {stateToDoList?.isLoadingPage && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            columns={{ xs: 2, sm: 12 }}
            sx={{
              border: "1px solid black",
              height: "100%",
              minHeight: "90vh",
            }}
          >
            <Grid
              item
              xs={1}
              sm={5}
              md={5}
              sx={{
                borderRight: {
                  xs: "none",
                  md: "1px solid black",
                },
                borderBottom: {
                  xs: "1px solid black",
                  md: "none",
                },
                py: {
                  xs: 3,
                },
                px: {
                  xs: 2,
                  md: 3,
                  lg: 5,
                },
              }}
            >
              <FormCreateComponent />
            </Grid>
            <Grid item xs={1} sm={7} md={7} sx={{}}>
              <ListComponent />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
