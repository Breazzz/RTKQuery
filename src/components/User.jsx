import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BasicModal from "./Modal";
import { useDispatch } from "react-redux";
import { deleteUser, setUser } from "../store/slices/userSlice";

export default function User({ user }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setUser(user));
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(deleteUser());
    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 200, my: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={user.avatar_url}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.login}
        </Typography>
        <Typography gutterBottom variant="h6" component="span">
          User reps:
        </Typography>
        <Button onClick={handleOpen}>Show</Button>

        {open && <BasicModal open={open} handleClose={handleClose} />}
      </CardContent>
    </Card>
  );
}
