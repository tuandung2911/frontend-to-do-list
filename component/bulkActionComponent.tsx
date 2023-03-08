import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { useToDoListContext } from "./selectors";

interface PropsBulkAction {
  onClickRemove?: () => void;
}

export default function BulkAcionComponent(props: PropsBulkAction) {
  const { state: stateToDoList, dispatch: dispatchToDoList } =
    useToDoListContext();
  const [inputTitle, setInputTitle] = React.useState<string>("");

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems="center"
      sx={{ backgroundColor: "#E4E5E8", p: 4 }}
    >
      <Typography>Bulk Action:</Typography>
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent={"space-between"}
        gap={2}
      >
        <Button variant="contained" sx={{ bgcolor: "#41729F", px: 3 }}>
          Done
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#F24740" }}
          disabled={stateToDoList.isLoadingPage}
          onClick={props.onClickRemove}
        >
          Remove
        </Button>
      </Stack>
    </Stack>
  );
}
