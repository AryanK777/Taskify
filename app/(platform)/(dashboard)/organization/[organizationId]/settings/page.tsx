import { OrganizationProfile } from "@clerk/nextjs";
import { Info } from "../_components/info";
import { checkSubscription } from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";


const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro || false} className="mb-2" />
      <Separator className="my-2" />
     <OrganizationProfile
      afterLeaveOrganizationUrl="/"
      appearance={{
        elements: {
          rootBox: {
            boxShadow: "none",
            width: "100%"
          },
          card: {
            border: "1px solid #e5e5e5",
            boxShadow: "none",
            width: "100%"
          }
        }
      }}
     />
    </div>
  );
};

export default SettingsPage;