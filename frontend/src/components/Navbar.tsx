import React from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Mail, Notifications, Search } from "@mui/icons-material";
import styled from "@emotion/styled";

type Props = {};


const Navbar = (props: Props) => {
  const Icons = styled(Box)({
  display: "none",
  gap: "20px",
  alignItems: "center",

})
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#ccc"  }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mr: 5 }}>
            Food Moji
          </Typography>
          <Box
            display="flex"
            borderRadius="3px"
            sx={{ backgroundColor: "#ccc" }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1, padding: "0 15px" }}
              placeholder="Search"
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <Search />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Icons>
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
            <Avatar
              src="https://cdn.sanity.io/images/8a6mxc3h/production/4a7b1469bd4656ea92c574bde390bbf7f4bcf6b4-128x192.webp"
              sx={{ width: 30, height: 30 }}
            />
          </Icons>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
