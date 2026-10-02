import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carRef = useRef(null);
  const statsTopRef = useRef(null);
  const statsBottomRef = useRef(null);
  const blackPanelRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // =========================================
      // INITIAL STATE
      // =========================================

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 40,
      });

      gsap.set(carRef.current, {
        opacity: 0,
        x: 0,
      });

      gsap.set(statsTopRef.current.children, {
        opacity: 0,
        y: 30,
      });

      gsap.set(statsBottomRef.current.children, {
        opacity: 0,
        y: 30,
      });


      // =========================================
      // PAGE LOAD ANIMATION
      // =========================================

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
        })
        .to(
          carRef.current,
          {
            opacity: 1,
            duration: 1,
          },
          "-=0.5"
        );


      // =========================================
      // CAR SCROLL ANIMATION
      // SAME MOVEMENT
      // =========================================

      gsap.to(carRef.current, {
        x: () => {
          const screenWidth = window.innerWidth;
          const carWidth = carRef.current.offsetWidth;

          return screenWidth - carWidth + 20;
        },

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });


      // =========================================
      // WELCOME TEXT
      // KEEP FULLY VISIBLE
      // =========================================

      gsap.to(titleRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });


      // =========================================
      // PERCENTAGE CARDS
      // =========================================

      const allStats = [
        ...statsTopRef.current.children,
        ...statsBottomRef.current.children,
      ];

      gsap.to(allStats, {
        opacity: 1,
        y: 0,

        duration: 0.5,

        stagger: 0.12,

        ease: "power3.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "5% top",
          end: "30% top",
          scrub: 1,
        },
      });


      // =========================================
      // BLACK BACKGROUND
      // FULL BLACK → 27%
      // =========================================

      gsap.to(blackPanelRef.current, {
        width: "27%",

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });


      ScrollTrigger.refresh();

    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <main
      ref={sectionRef}
      className="scroll-section"
    >

      <div className="sticky-screen">

        {/* =========================================
            TOP STATS
        ========================================= */}

        <div
          ref={statsTopRef}
          className="stats stats-top"
        >

          <div className="stat-card green-card">
            <h2>58%</h2>
            <p>Increase in pick up point use</p>
          </div>

          <div className="stat-card dark-card">
            <h2>27%</h2>
            <p>Increase in pick up point use</p>
          </div>

        </div>


        {/* =========================================
            HERO
        ========================================= */}

        <div className="hero-bar">

          {/* BLACK BACKGROUND */}

          <div
            ref={blackPanelRef}
            className="black-panel"
          ></div>


          {/* WELCOME */}

          <h1 ref={titleRef}>
            WELCOME ITZFIZZ
          </h1>


          {/* CAR */}

          <img
            ref={carRef}
            className="car"
            src="/car.png"
            alt="Car"
          />

        </div>


        {/* =========================================
            BOTTOM STATS
        ========================================= */}

        <div
          ref={statsBottomRef}
          className="stats stats-bottom"
        >

          <div className="stat-card blue-card">
            <h2>23%</h2>
            <p>Decreased in customer phone calls</p>
          </div>

          <div className="stat-card orange-card">
            <h2>40%</h2>
            <p>Decreased in customer phone calls</p>
          </div>

        </div>


        {/* =========================================
            SCROLL
        ========================================= */}

        <div className="scroll-text">
          S C R O L L
        </div>

      </div>

    </main>
  );
}

export default App;