import React from "react";
import NavButtons from "./NavButtons";

const Artist = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto", border: "3px solid white" }}>About RIQ</h1>
      <h4 style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto", border: "3px solid white" }}>
        My name is Taariq Elliott. Originally from Maryland. Currently living in
        Los Angeles, CA. I'm a self taught musician, producer, audio engineer,
        sound designer & DJ. I believe in wearing multiple hats when it comes to
        the process of making music as it's always changing & adapting is an
        important skill for longevity as an artist. I have over 10 years of
        experience with music production, audio engineering, and sound design
        all led by pure curiosity for the craft. 
      </h4>
      <h5 style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto", border: "3px solid white" }}>
        My music journey started in middle school when I taught myself how to
        play drums and guitar after falling in love with Guitar Hero 3. DJing
        came into play shortly after as I was still led by curiosity for the
        overall subject of music. From there I learned about producing in 2012
        and I haven't looked back since. I've been fortunate enough to work
        extensively with a number of softwares, samplers & instruments. This
        includes: FL Studio Logic Pro Ableton Koala Sampler Garageband Traktor
        Scratch Pro Virtual DJ Serato Studio & Band Lab to name a few Sound
        Design is at the center of my creative process as I feel it's integral
        for true self-expression and creative freedom.
      </h5>

      <h6 style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto", border: "3px solid white" }}>
        Experimentation can be full of failures & unexpected results but that's
        where the real magic lies. Sound design is much like a science
        experiment where you're constantly hypothesizing, testing, tweaking,
        researching, and then coming up with tangible conclusions all with
        sound. This process has allowed me to explore the world of sample
        making. Sound design has taught me how to turn squeaky doors into lush
        synth patches, how to turn running water into ambient soundscapes, and
        even how to turn a 5-second recording of clanging forks into a full
        percussion ensemble. The possibilities are endless with sound design.
        Currently, I'm working as a producer, recording, mixing, and mastering
        engineer in a professional studio setting. This includes collaborating
        with musicians, coordinating sessions, recording vocalists, and working
        with other producers on multiple projects across all genres. 
      </h6>

      <h4 style={{ textAlign: "center", maxWidth: "1000px", margin: "0 auto", border: "3px solid white" }}>
        “If you can let go of passion and follow your curiosity, your curiosity
        just might lead you to your passion.” – Elizabeth Gilbert
      </h4>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="https://f4.bcbits.com/img/0024637118_25.jpg"
          alt=""
          style={{ maxWidth: "500px" }}
        />
        <img
          src="https://media.sellfy.com/images/JBxkHtlQ/QXtE/IMG_1919.JPG"
          alt=""
          style={{ maxWidth: "500px" }}
        />
        <img
          src="https://f4.bcbits.com/img/0024637118_25.jpg"
          alt=""
          style={{ maxWidth: "500px" }}
        />
      </div>
      <NavButtons/>
    </div>
  );
};

export default Artist;
