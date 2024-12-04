import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { AddRounded } from "@mui/icons-material";
import CategoryForm from "./CategoryForm";
import ProductForm from "./ProductForm";

function AddMenu() {
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="shrink-0">
            <AddRounded />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsCategoryFormOpen(true)}>
            Category
            {/* <CategoryForm open={isCategoryFormOpen} /> */}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsProductFormOpen(true)}>
            Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CategoryForm
        open={isCategoryFormOpen}
        onOpenChange={setIsCategoryFormOpen}
      />
      <ProductForm
        open={isProductFormOpen}
        onOpenChange={setIsProductFormOpen}
      />
    </div>
  );
}

export default AddMenu;
