import React, { useState, useEffect } from "react";

import { FiChevronUp } from "react-icons/Fi";

const GoTop = (props: any) => {
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showGoTop, setshowGoTop] = useState("goTopHidden");

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);

    if (scrollPosition > 50) {
      return setshowGoTop("goTop");
    } else if (scrollPosition < 50) {
      return setshowGoTop("goTopHidden");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });

  const InnerGoTop = (props: any) => {
    return (
      <>
        <div className={props.showGoTop} onClick={props.scrollUp}>
          <button className="goTop">
            <FiChevronUp className="goTop__text fas fa-chevron-up" />
          </button>
        </div>
      </>
    );
  };

  return (
    <InnerGoTop
      showGoTop={showGoTop}
      scrollUp={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    />
  );
};

export default GoTop;
