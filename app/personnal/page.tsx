import PersonnalComponent from "@/components/personnal";
import { getAllPersonal } from "@/sanity/queries";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function PersonalPage() {
  const personalData = await getAllPersonal();
  if (!personalData) {
    throw new Error("No data");
  }
  console.log(personalData);
  return <PersonnalComponent personnalData={personalData} />;
}
