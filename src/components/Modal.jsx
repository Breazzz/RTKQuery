import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useLazyGetUserReposQuery } from "../store/github/github.api";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { format } from "date-fns";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

export default function BasicModal({ open, handleClose }) {
  const { user } = useSelector((state) => state.user);
  const [fetchRepos, { isLoading, data }] = useLazyGetUserReposQuery();

  console.log("user->", user);

  useEffect(() => {
    fetchRepos(user?.login);
  }, []);

  console.log("repos data->", data);

  const getDateRepo = (date) => {
    return format(new Date(date), "dd.MM.yyyy");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading ? (
            <div style={{ display: "grid", placeContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {user?.login} reps:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <List sx={{ maxHeight: "250px", overflowY: "auto" }}>
                  {data?.map((rep) => (
                    <ListItem key={rep.node_id}>
                      <ListItemButton>
                        <a
                          rel="noreferrer"
                          href={rep.html_url}
                          target="_blank"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <ListItemIcon>
                            <GitHubIcon />
                          </ListItemIcon>
                          <div>
                            {rep.full_name}{" "}
                            <span style={{ fontSize: 10 }}>
                              ({getDateRepo(rep.updated_at)})
                            </span>
                          </div>
                        </a>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
