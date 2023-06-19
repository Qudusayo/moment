import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FiImage } from "react-icons/fi";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { IoIosVolumeHigh, IoIosVolumeOff } from "react-icons/io";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  height: 60px !important;
`;

const Time = styled.p`
  margin: 0;
  font-size: 1.5em;
  margin-left: auto;
`;

const Icon = styled.div`
  position: fixed;
  bottom: 1em;
  left: 1em;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const Volume = styled.div`
  position: fixed;
  bottom: 1.25em;
  left: 5em;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export default function Navbar({
  vids,
  muted,
  mutedHandler,
  bgSwitchHandler,
}: {
  vids: { video: string; thumbnail: string }[];
  muted: boolean;
  mutedHandler: () => void;
  bgSwitchHandler: (id: number) => void;
}) {
  const [time, setTime] = useState("");

  function parseTime(timeVal: string) {
    return timeVal.toString().length === 1
      ? timeVal.toString().padStart(2, "0")
      : timeVal;
  }

  useEffect(() => {
    // Get time in AM or PM without seconds
    const interval = setInterval(() => {
      const date = new Date();
      const hours = parseTime(date.getHours().toString());
      let minutes = parseTime(date.getMinutes().toString());
      const ampm = parseInt(hours) >= 12 ? "PM" : "AM";
      const time = `${hours}:${minutes} ${ampm}`;
      setTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Nav>
        <Time>{time}</Time>
      </Nav>
      <Icon>
        <GalleryMenu
          vids={vids}
          muted={muted}
          mutedHandler={mutedHandler}
          bgSwitchHandler={bgSwitchHandler}
        />
      </Icon>
    </>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1b1c1e",
  padding: "1.1em 1em",
  textAlign: "center",
  color: "#fff",
  cursor: "pointer",
  fontSize: "1.35em",
}));

function GalleryMenu({
  vids,
  muted,
  mutedHandler,
  bgSwitchHandler,
}: {
  vids: { video: string; thumbnail: string }[];
  muted: boolean;
  mutedHandler: () => void;
  bgSwitchHandler: (id: number) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          gap: ".5em",
          mb: "3.5em",
        }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Icon>
            <FiImage size={30} />
          </Icon>
        </IconButton>
        <Volume onClick={mutedHandler}>
          {muted ? <IoIosVolumeOff size={35} /> : <IoIosVolumeHigh size={35} />}
        </Volume>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              bottom: -10,
              left: 10,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Box
          sx={{ flexGrow: 1 }}
          px={1}
          width={"320px"}
          height={"180px"}
          overflow={"auto"}
        >
          <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
            {vids.map((_, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Item
                  onClick={() => bgSwitchHandler(index)}
                  sx={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${vids[index].thumbnail})`,
                  }}
                >
                  {index + 1}
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Menu>
    </React.Fragment>
  );
}
