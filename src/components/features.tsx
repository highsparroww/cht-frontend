import React from "react";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

// Minimal cn helper so this file works standalone.
// If you already use a cn/twMerge utility in your project, feel free to remove this
// and import from "@/lib/utils" instead.
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Built for developers",
      description:
        "Built for engineers, developers, dreamers, thinkers and doers.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Ease of use",
      description:
        "It's as easy as using an Apple, and as expensive as buying one.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Pricing like no other",
      description:
        "Our prices are best in the market. No cap, no lock, no credit card required.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "100% Uptime guarantee",
      description: "We just cannot be taken down by anyone.",
      icon: <IconCloud />,
    },
    {
      title: "Multi-tenant Architecture",
      description: "You can simply share passwords instead of buying new seats",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "We are available a 100% of the time. Atleast our AI Agents are.",
      icon: <IconHelp />,
    },
    {
      title: "Money back guarantee",
      description:
        "If you donot like EveryAI, we will convince you to like us.",
      icon: <IconAdjustmentsBolt />,
    },
  ]; // removed the last row "And everything else"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 py-16 max-w-7xl mx-auto px-6">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

type FeatureProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
};

const Feature = ({ title, description, icon }: FeatureProps) => {
  return (
    <div className="flex flex-col p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition">
      <div className="mb-4 text-neutral-600 dark:text-neutral-400">{icon}</div>
      <div className="text-lg font-bold mb-2 text-neutral-800 dark:text-neutral-100">
        {title}
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
};

/*
Usage:

1) Install icons if needed:
   npm i @tabler/icons-react

2) Import and drop into a page/component:
   import FeaturesSectionDemo from "./FeaturesSectionDemo";

   export default function HomePage() {
     return (
       <main className="min-h-screen bg-white dark:bg-neutral-900">
         <FeaturesSectionDemo />
       </main>
     );
   }

3) If you already have a `cn` helper in `@/lib/utils`, delete the inline one
   above and uncomment your import.
*/
