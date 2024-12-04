import clsx from "clsx";
import { memo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  ArrowBackIos,
  ArrowBackIosNew,
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
} from "@mui/icons-material";

const PAGES_LIMIT = 5;
const Pagination = memo<{
  current?: number;
  total?: number;
  action?: Function;
  url: string;
}>(function Pagination({ current = 1, total = 1, action = () => {}, url }) {
  const pages = [];
  if (current < 1) current = 1;
  if (current > total) current = total;
  // console.log(current, pages);
  for (
    let i = current - 1;
    i >= 1 && pages.length < Math.floor(PAGES_LIMIT / 2);
    i--
  ) {
    pages.unshift(i);
  }
  // console.log(current, pages);
  pages.push(current);

  for (let i = current + 1; i <= total && pages.length < PAGES_LIMIT; i++) {
    // console.log(pages);
    pages.push(i);
  }

  for (let i = pages[0] - 1; pages.length < PAGES_LIMIT && i >= 1; i--) {
    pages.unshift(i);
  }
  return (
    <div className="flex gap-2 justify-center items-center rounded-lg">
      <Link
        href={`${url}page=${1}`}
        className={clsx([{ invisible: pages.at(0) <= 1 }])}
      >
        <Button size="icon" variant="ghost">
          <KeyboardDoubleArrowLeftRounded />
        </Button>
      </Link>

      <Link href={current > 1 ? `${url}page=${current - 1}` : ""}>
        <Button size="icon" variant="ghost" disabled={current <= 1}>
          <ArrowBackIosNewRounded fontSize="small" />
        </Button>
      </Link>
      {pages.map((num) => (
        <Link href={`${url}page=${num}`} key={num}>
          <Button
            // key={num}
            className="transition-none"
            size="icon"
            variant={num == current ? "default" : "ghost"}
          >
            {num}
          </Button>
        </Link>
      ))}
      <Link href={current < total ? `${url}page=${current + 1}` : ""}>
        <Button size="icon" variant="ghost" disabled={current >= total}>
          <ArrowForwardIosRounded fontSize="small" />
        </Button>
      </Link>

      <Link
        href={`${url}page=${total}`}
        className={clsx([{ invisible: pages.at(-1) >= total }])}
      >
        <Button size="icon" variant="ghost">
          <KeyboardDoubleArrowRightRounded />
        </Button>
      </Link>
    </div>
  );
});
export default Pagination;
