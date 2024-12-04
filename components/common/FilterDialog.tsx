import {
  AddRounded,
  Cancel,
  FilterAltRounded,
  SortRounded,
} from "@mui/icons-material";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import classes from "./FilterDialog.module.css";

const FilterDialog = ({
  action,
  state,
  params: { filter, sort },
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [filterState, setFilterState] = useState({});
  const [sortState, setSortState] = useState([]);

  useEffect(() => {
    if (open) {
      // console.log(state);
      setFilterState({ ...state.filter });
      setSortState([...state.sort]);
    }
  }, [open, state]);

  const filterStateHandler = (type, values) => {
    setFilterState((s) => {
      const filter = { ...s };
      if (values.length == 0) delete filter[type];
      else filter[type] = values;
      return filter;
    });
  };
  // console.log(filterState);

  const sortStateHandler = (item, remove = false) => {
    setSortState((s) => {
      const newState = [...s];
      let index = newState.findIndex((f) => f.value == item.value);
      // console.log(newState);
      if (index == -1) {
        newState.push({
          value: item.value,
          order: 1,
        });
        return [...newState];
      }

      // console.log(newState);
      if (!remove) {
        // console.log(index);

        newState[index] = {
          value: item.value,
          order: item.order,
        };
        return [...newState];
      } else {
        newState.splice(index, 1);
        return [...newState];
      }
    });
  };

  const clearHandler = () => {
    setFilterState({});
    setSortState([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter & Sort</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {!!filter.length && (
            <div className="flex flex-col gap-1">
              <h2 className="font-bold flex items-center gap-2 mb-1 mt-4">
                <FilterAltRounded fontSize="small" />
                <p>Filter</p>
              </h2>
              {filter.map((f) => (
                <div className="flex items-center gap-4" key={f.name}>
                  <p className="font-semibold">{f.name}:</p>
                  <ToggleGroup
                    type="multiple"
                    onValueChange={(e) => filterStateHandler(f.name, e)}
                    value={filterState[f.name]}
                  >
                    {f.value.map((s) => (
                      <ToggleGroupItem key={s} value={s}>
                        {s}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-1 items-start">
            <h2 className="font-bold flex items-center gap-2 mb-2 mt-4">
              <SortRounded fontSize="small" />
              <p>Sort</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-auto gap-1"
                    size="icon"
                    disabled={sort.length == state.sort.length}
                  >
                    <AddRounded fontSize="small" color="action" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sort
                    .filter((s) => !sortState.find((f) => f.value == s))
                    .map((s) => (
                      <DropdownMenuItem
                        key={s}
                        onClick={(e) =>
                          sortStateHandler({ value: s, order: 1 })
                        }
                      >
                        {s}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </h2>
            <div className="flex gap-2 flex-wrap">
              {sortState.map((s) => (
                <div
                  key={s.value}
                  className="flex items-center gap-2 p-1 pl-3 pr-3 bg-accent rounded-sm"
                >
                  <SortRounded
                    fontSize="small"
                    color="action"
                    onClick={(e) =>
                      sortStateHandler({ value: s.value, order: -s.order })
                    }
                    className={clsx("cursor-pointer", classes["order-icon"], {
                      [classes.desc]: s.order == -1,
                    })}
                  />
                  {s.value}
                  <Cancel
                    fontSize="small"
                    color="disabled"
                    className="cursor-pointer"
                    onClick={(e) => {
                      sortStateHandler({ value: s.value }, true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={(e) => {
              clearHandler();
              // action({
              //   filter: filterState,
              //   sort: sortState,
              // });
            }}
          >
            Clear
          </Button>
          <Button
            onClick={(e) => {
              action({ filter: filterState, sort: sortState });
              setOpen(false);
            }}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
