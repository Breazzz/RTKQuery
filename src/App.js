import { useState } from "react";
import { useSearchUsersQuery } from "./store/github/github.api";
import "./styles.css";
import { useDebounce } from "./useDebounce";
import User from "./components/User";
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function App() {
  const [value, setValue] = useState("");

  const debounced = useDebounce(value);

  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3
  });

  if (data) {
    console.log("data", data);
  }

  return (
    <div className="App">
      <TextField
        label="GitHub nickname"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {isLoading && (
        <div style={{ display: "grid", placeContent: "center" }}>
          <CircularProgress />
        </div>
      )}

      {data?.length > 1 && isError && <h4>error</h4>}

      {data?.map((user) => (
        <User user={user} key={user?.id} />
      ))}
    </div>
  );
}
