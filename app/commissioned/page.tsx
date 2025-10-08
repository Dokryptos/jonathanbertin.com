import CommissionedComponent from "@/components/commissioned";
import { getAllCommissioned } from "@/sanity/queries";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function CommissionedPage() {
  const commissionedData = await getAllCommissioned();
  if (!commissionedData) {
    throw new Error("No data");
  }
  return <CommissionedComponent commissionedData={commissionedData} />;
}
