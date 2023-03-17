import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import SearchBar from "@mui/material";
import { LoginUser } from "../model";
import DropDownMenu from "./DropDownMenu";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#59516E",
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const ctx = useAppContext();
  const [value, setValue] = useState<string>("");
  const [dropDown, setDropDown] = useState<boolean>(false);

  if (ctx === null) return <div>...Loading</div>;

  const {
    updateUserLocation,
    loginUser,
    toggleUserInfo,
    getUserInformation,
    isUserLoggedIn,
    user,
  } = ctx;

  const openUserInfo = () => {
    if (isUserLoggedIn) {
      if (user == null) {
        getUserInformation();
      }
      setDropDown(!dropDown);
    } else {
      toggleUserInfo();
    }
  };

  const handleSubmit = () => {
    updateUserLocation(value);
    setValue("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          {dropDown && <DropDownMenu />}
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 1 }}
              onClick={openUserInfo}
            >
              <AccountCircleIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Weather App
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Zip Code or city..."
                inputProps={{ "aria-label": "search" }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Search>
            <button
              className="p-2 bg-white text-dark-purple rounded-sm"
              onClick={handleSubmit}
            >
              Search
            </button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
