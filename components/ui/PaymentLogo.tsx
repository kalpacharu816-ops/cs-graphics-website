"use client";

import Image from "next/image";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaBitcoin,
  FaMoneyBillWave,
} from "react-icons/fa";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import type { PaymentSlug } from "@/lib/payment-methods.config";
import { cn } from "@/lib/utils";

export function PaymentLogo({
  slug,
  className,
}: {
  slug: PaymentSlug;
  className?: string;
}) {
  const wrap = cn("flex items-center justify-center", className);

  switch (slug) {
    case "visa":
      return (
        <span className={wrap} aria-hidden>
          <FaCcVisa className="h-9 w-auto text-[#1a1f71]" />
        </span>
      );
    case "mastercard":
      return (
        <span className={wrap} aria-hidden>
          <FaCcMastercard className="h-9 w-auto text-[#eb001b]" />
        </span>
      );
    case "paypal":
      return (
        <span className={wrap} aria-hidden>
          <FaPaypal className="h-8 w-auto text-[#003087]" />
        </span>
      );
    case "payhere":
      return (
        <span className={wrap} aria-hidden>
          <Image
            src="/payments/payhere.svg"
            alt=""
            width={100}
            height={28}
            className="h-7 w-auto object-contain"
          />
        </span>
      );
    case "bank-transfer":
      return (
        <span className={wrap} aria-hidden>
          <HiOutlineBuildingLibrary className="h-8 w-8 text-cs-silver" />
        </span>
      );
    case "cash":
      return (
        <span className={wrap} aria-hidden>
          <FaMoneyBillWave className="h-8 w-8 text-cs-neon" />
        </span>
      );
    case "crypto":
      return (
        <span className={wrap} aria-hidden>
          <FaBitcoin className="h-8 w-8 text-[#f7931a]" />
        </span>
      );
    default:
      return null;
  }
}
