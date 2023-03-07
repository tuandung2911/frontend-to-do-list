import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import ListComponent from "../component/listComponent";
import FormUpdateComponent from "../component/formCreateComponent";
import ToDoListProvider from "../component/provider";

export default function Home() {
  return (
    <ToDoListProvider>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            columns={12}
            sx={{
              border: "1px solid black",
              height: "100%",
              minHeight: "90vh",
            }}
          >
            <Grid
              item
              xs={2}
              sm={4}
              md={5}
              sx={{
                borderRight: "1px solid black",
                py: 3,
                px: 5,
              }}
            >
              <FormUpdateComponent />
            </Grid>
            <Grid
              item
              xs={2}
              sm={4}
              md={7}
              sx={{
                py: 3,
                px: 5,
              }}
            >
              <ListComponent />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ToDoListProvider>
  );
}
