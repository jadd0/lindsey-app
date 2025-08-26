import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from "react";

export interface NonScrollScreenHandle {
  inView: boolean;
}

const NonScrollScreen = forwardRef<NonScrollScreenHandle, { children: React.ReactNode }>(
  ({ children }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { threshold: 0 }
      );
      if (divRef.current) observer.observe(divRef.current);
      return () => observer.disconnect();
    }, []);

    useImperativeHandle(ref, () => ({ inView }), [inView]);

    return (
      <div className="h-[97vh] w-screen">
        {children}
        <div className="h-[3vh]" ref={divRef} />
      </div>
    );
  }
);

export default NonScrollScreen;
