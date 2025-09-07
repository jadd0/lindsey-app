import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
import Lenis from "lenis";
import BackgroundSectionHeading from "./BackgroundSectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function VideoScrollComponent() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const tlRef = useRef(null);
  const lenisRef = useRef(null);

  // Setup Lenis once per app (ideally in your top-level/root file)
  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      lerp: 0.12, // Adjust for desired smoothness
      smooth: true,
    });

    // Each time Lenis scrolls, update ScrollTrigger
    lenisRef.current.on("scroll", ScrollTrigger.update);

    // Use requestAnimationFrame for smooth updates
    function raf(time) {
      lenisRef.current.raf(time);
      // Don't call ScrollTrigger.update here - it's handled by .on('scroll')
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Lag smoothing disables GSAP's default easing on ticker
    gsap.ticker.lagSmoothing(0);

    return () => {
      // No dispose needed unless you move/unmount the smooth scroll instance
      lenisRef.current.destroy?.();
    };
  }, []);

  // iOS activation helper
  const activateVideoOnIOS = () => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => {
            video.pause();
          })
          .catch(() => {
            console.log("iOS video activation failed");
          });
      }
    }
  };

  useGSAP(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!video || !container) return;

    const handleLoadedMetadata = () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }

      // Main scrub timeline for video
      tlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          pin: true,
          end: "+=300%",
          scrub: 1, // or true
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress <= 0.66) {
              video.currentTime = (progress / 0.66) * video.duration;
            } else {
              video.currentTime = video.duration;
            }
          },
        },
      });

      // Video scrubbing and zoom
      tlRef.current.fromTo(
        video,
        { currentTime: 0 },
        { currentTime: video.duration, duration: 0.66, ease: "none" }
      );
      tlRef.current.to(
        video,
        {
          scale: 12,
          transformOrigin: "center 7%",
          duration: 0.34,
          ease: "power2.out",
        },
        0.66
      );

      // Video fade out during last 10% of the timeline
      tlRef.current.to(
        container,
        {
          opacity: 0,
          duration: 0.1,
          ease: "power2.out",
        },
        0.9
      );
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleFirstTouch = () => {
      activateVideoOnIOS();
      document.removeEventListener("touchstart", handleFirstTouch);
    };
    document.addEventListener("touchstart", handleFirstTouch);

    video.load();

    return () => {
      if (video) {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
      document.removeEventListener("touchstart", handleFirstTouch);
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, []);

  // Blob loading for better performance
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const timer = setTimeout(() => {
      if (window.fetch && video.src) {
        fetch(video.src)
          .then((response) => response.blob())
          .then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            const currentTime = video.currentTime;
            video.src = blobURL;
            video.currentTime = currentTime + 0.01;
          })
          .catch((error) => {
            console.log("Blob loading failed:", error);
          });
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="scroll-container">
      <div className="spacer" style={{ height: "30vh" }}></div>

      <div ref={containerRef} className="video-container w-1/2">
        <BackgroundSectionHeading />
        <video
          ref={videoRef}
          src="/output.mp4"
          muted
          playsInline
          preload="metadata"
          style={{
            pointerEvents: "none",
            width: "100%",
            height: "auto",
          }}
          className="rounded-4xl border-2 border-[#0089ff]"
        />
      </div>
    </div>
  );
}
