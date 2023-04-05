import React from "react";
import HeroSlider, { Slide } from "hero-slider";
import biomimicry_ex1 from "../../assets/images/biomimicry_ex1.jpeg";
import Petal from "../../assets/images/Petal.png";

{
  /* Does Not Work*/
}
const App = () => {
  return (
    <HeroSlider
      slidingAnimation='left_to_right'
      orientation='horizontal'
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log("onBeforeChange", previousSlide)
      }
      onChange={(nextSlide) => console.log("onChange", nextSlide)}
      style={{
        backgroundColor: "rgba(0,0,0,0.33)",
      }}
      settings={{
        slidingDuration: 250,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: false,
        autoplayDuration: 5000,
        height: "100vh",
      }}>
      <Slide
        background={{
          backgroundImageSrc:
            "https://ahrefs.com/blog/wp-content/uploads/2021/05/backlinks.png",
          backgroundAttachment: "fixed",
        }}
      />
      <Slide
        background={{
          backgroundImageSrc: biomimicry_ex1,
          backgroundAttachment: "fixed",
        }}
      />
    </HeroSlider>
  );
};

export default App;
