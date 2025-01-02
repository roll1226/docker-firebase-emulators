import { memo } from "react";

const SlowList = memo(({ text }: { text: string }) => {
  console.log("[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />");
  const items = Array(250)
    .fill(null)
    .map((_, i) => <SlowItem key={i} text={text} />);
  return <ul>{items}</ul>;
});

const SlowItem = ({ text }: { text: string }) => {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Text: {text}</li>;
};

export default SlowList;
