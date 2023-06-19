import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import styled from "@emotion/styled";
import { LuSearch } from "react-icons/lu";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  transition: background-color 0.2s ease-in-out;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  width: 95%;
`;

const Input = styled.input`
  max-width: 25em;
  width: 90%;
  height: 2em;
  border: none;
  outline: none;
  padding: 0.5em;
  padding-left: 0;
  border-bottom: 2px solid #f0f0f0;
  font-size: 1.5em;
  background-color: transparent;

  & + div {
    position: fixed;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    transition: background-color 0.2s ease-in-out;
  }

  &:focus + div {
    background-color: #00000025;
  }
`;

const Icon = styled.label`
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

function App() {
  const [muted, setMuted] = useState(true);
  const [bgSource, setBgSource] = useState("");
  const [enteredText, setEnteredText] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [vids] = useState([
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687075387/vids/1_mopco0.mp4",
      thumbnail: "https://i3.ytimg.com/vi/if72epuundg/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687089559/2_cptrfg.mp4",
      thumbnail: "https://i3.ytimg.com/vi/pmxRWbq-pq0/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687089558/3_sd1ky6.mp4",
      thumbnail: "https://i3.ytimg.com/vi/4A5QfK2WUMo/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687089532/4_re5iyp.mp4",
      thumbnail: "https://i3.ytimg.com/vi/YcGUZ-qTIJY/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687075588/vids/5_ghfznb.mp4",
      thumbnail: "https://i3.ytimg.com/vi/gnI9YedUom0/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687089657/6_qnllqv.mp4",
      thumbnail: "https://i3.ytimg.com/vi/ff_5TPy31SE/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687075569/vids/7_pbs1b7.mp4",
      thumbnail: "https://i3.ytimg.com/vi/fd3T8GTJmHA/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687089666/8_tswmxd.mp4",
      thumbnail: "https://i3.ytimg.com/vi/wt6mwz2YoDU/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687075571/vids/9_iviono.mp4",
      thumbnail: "https://i3.ytimg.com/vi/BavBbXkOZpQ/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687075599/vids/10_cqmcir.mp4",
      thumbnail: "https://i3.ytimg.com/vi/G1qfRcokkak/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687075579/vids/11_z36w7x.mp4",
      thumbnail: "https://i3.ytimg.com/vi/02aw8304yIY/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687075574/vids/12_o6t6qs.mp4",
      thumbnail: "https://i3.ytimg.com/vi/IRLGpfo0U6M/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687077014/vids/13_maddm7.mp4",
      thumbnail: "https://i3.ytimg.com/vi/P3qqdPTB3bc/maxresdefault.jpg",
    },
    {
      video:
        "https://res.cloudinary.com/quelabs/video/upload/v1687159782/Neon_Effect_Black_Screen___Neon_Effect_Video___Neon_Effect_Green_Screen___Neon_L_qkdoqa.mp4",
      thumbnail: "https://i3.ytimg.com/vi/PsdM1mKkXxA/maxresdefault.jpg",
    },
  ]);

  const bgSourceUpdateHandler = (id: number) => {
    setBgSource(vids[id].video);
  };

  const mutedHandler = () => {
    setMuted((prevState) => !prevState);
    // localStorage.setItem("muted", JSON.stringify(!muted));
  };

  useEffect(() => {
    videoRef.current?.load();
    if (bgSource) {
      localStorage.setItem("bgVideo", bgSource);
    }
  }, [bgSource]);

  useEffect(() => {
    let bgVideo = localStorage.getItem("bgVideo");
    // let muted = localStorage.getItem("muted");
    if (bgVideo) {
      setBgSource(bgVideo);
    } else {
      let randomVid = vids[Math.floor(Math.random() * vids.length)].video;
      setBgSource(randomVid);
    }
    // if (muted) {
    //   setMuted(JSON.parse(muted));
    // }
  }, []);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enteredText.trim().length === 0) {
      return;
    }
    // Search entered text in Google in same tab
    window.location.href = `https://www.google.com/search?q=${enteredText}`;
  };

  return (
    <>
      <Container>
        <Navbar
          vids={vids}
          muted={muted}
          mutedHandler={mutedHandler}
          bgSwitchHandler={bgSourceUpdateHandler}
        />
        <video autoPlay muted={muted} loop id="background-video" ref={videoRef}>
          <source src={bgSource} type="video/mp4" />
        </video>
        <Content>
          <Form onSubmit={formSubmitHandler}>
            <Icon htmlFor="search">
              <LuSearch size={30} />
            </Icon>
            <Input
              id="search"
              type="text"
              value={enteredText}
              onChange={(e) => setEnteredText(e.target.value)}
            />
            <div></div>
          </Form>
        </Content>
      </Container>
    </>
  );
}

export default App;
