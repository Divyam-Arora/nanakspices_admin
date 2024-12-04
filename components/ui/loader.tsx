import clsx from "clsx";

const Loader = ({ show = false }) => {
  return (
    <span
      className={clsx(["loader", { "hide my-0": !show, "my-2": show }])}
    ></span>
  );
};

export default Loader;
