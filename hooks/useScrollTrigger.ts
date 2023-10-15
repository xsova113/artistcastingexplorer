import { useEffect, useState } from "react";

export const useScrollTrigger = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    window.addEventListener("scroll", function () {
      // Get the new Value
      currentScrollPosition = window.scrollY;

      if (window.scrollY === 0) {
        return setShow(true);
      }

      //Subtract the two and conclude
      if (previousScrollPosition - currentScrollPosition < 0) {
        setShow(false);
      } else if (previousScrollPosition - currentScrollPosition > 0) {
        setShow(true);
      }

      // Update the previous value
      previousScrollPosition = currentScrollPosition;
    });
  }, []);

  return show;
};
