import BackButton from "@/components/common/BackButton";
import Description from "@/components/product/details/Description";
import ImageList from "@/components/product/details/ImageList";
import Info from "@/components/product/details/Info";
import RecentOrders from "@/components/product/details/RecentOrders";
import Types from "@/components/product/details/Types";
import { Button } from "@/components/ui/button";
import { getData } from "@/hooks/root";
import {
  ArrowBackIosNewRounded,
  ArrowBackIosRounded,
  ArrowLeftRounded,
} from "@mui/icons-material";
import { revalidatePath } from "next/cache";

async function Page({ params }) {
  const product = await getData(`/admin/product/${params.productId}`);
  console.log(product);

  const refresh = async () => {
    "use server";
    revalidatePath(`/inventory/${product.id}`, "page");
  };
  return (
    <>
      <div className="page-header-container sticky top-0">
        <BackButton />
      </div>
      <div
        className="grid gap-4 auto-rows-min"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        <div className="col-span-full">
          <ImageList list={product.ProductImage} productId={product.id} />
        </div>
        <Info product={product} />
        <Description product={product} />
        <div className="col-span-full">
          <Types productTypes={product.productType} productId={product.id} />
        </div>
        <div className="col-span-full">
          <RecentOrders orders={product.OrderedProducts} />
        </div>
      </div>
    </>
  );
}

export default Page;
