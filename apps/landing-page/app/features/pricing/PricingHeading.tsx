import { TextLink } from "@/components/link";
import { stripeClimateUrl } from "@/constants";
import { LeafIcon } from "@typebot.io/ui/icons/LeafIcon";

export const PricingHeading = () => (
  <div className="flex flex-col gap-8 items-start">
 
    <h1>Flexible plans that scale with you</h1>
    <p className="max-w-2xl">
      Whether you're a{" "}
      <span className="text-orange-9 font-bold">solo business owner</span>, a{" "}
      <span className="text-purple-9 font-bold">growing startup</span> or a{" "}
      <span className="font-bold">large company</span>, Typebot is here to help
      you build high-performing chat forms for the right price. Pay for as
      little or as much usage as you need.
    </p>
  </div>
);

 
