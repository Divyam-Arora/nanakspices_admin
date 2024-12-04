import { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

const SIZES = {
  sm: "48px",
  md: "160px",
  lg: "250px",
};

const Card = ({
  title = "",
  loading = false,
  children,
  className = "",
  size = "md",
}: {
  title?: string;
  loading?: boolean;
  children?: ReactNode;
  className?: string;
  size?: keyof typeof SIZES;
}) => {
  return (
    <div
      className={`flex flex-col gap-6 p-4 bg-background rounded-lg ${className}`}
      style={{ backgroundColor: "hsl(var(--background) / 75%)" }}
    >
      {title && <h2 className="font-bold">{title}</h2>}
      {loading ? (
        <Skeleton
          className={`w-full ${`min-h-[${SIZES[size]}]`} h-full`}
          style={{ minHeight: SIZES[size] }}
        />
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default Card;
