import { checkSubscription } from "@/lib/subscription"
import { Separator } from "@/components/ui/separator";

import { SubscriptionButton } from "./_components/subscription-button";

import { Info } from "../_components/info";
import PricingCard from "./_components/pricingCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import clsx from "clsx";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

const BillingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro || false} />
      <Separator className="my-2" />
      <h2 className="text-2xl p-4">Current Plan</h2>
      <PricingCard
          planExists={isPro}
          amt={isPro ? '$20' : '$0'}
          buttonCta={isPro ? 'Manage' : 'Upgrade'}
          highlightDescription={isPro ? "Want to change or manage your plan? You can do this here. If you have further question contact support@taskify.com" : "Want to upgrade your plan? You can do this here. If you have further question contact support@taskify.com"}
          features={isPro ? ['Unlimited boards', 'Advanced checklists', 'Admin and security features'] : ["Limited boards", "basic checklists", "Only essential security features."]}
          description={isPro ? "Better collaboration, custom workflows, and priority support with our Premium Plan!" : "Try our Basic Plan. Perfect for experiencing our powerful platform with no commitment!"}
          duration="/ month"
          title={isPro ? "Pro" : "Basic"}
          isPro={isPro ? true : false}
      />
    </div>
  );
};

export default BillingPage;