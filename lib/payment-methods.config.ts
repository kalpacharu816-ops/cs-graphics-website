export type PaymentSlug =
  | "visa"
  | "mastercard"
  | "paypal"
  | "payhere"
  | "bank-transfer"
  | "cash"
  | "crypto";

export type PaymentMethodConfig = {
  slug: PaymentSlug;
  name: string;
  shortDescription: string;
  instructions: string[];
  accountDetails?: { label: string; value: string }[];
  qrImage?: string;
  note?: string;
};

export const PAYMENT_METHODS_CONFIG: Record<PaymentSlug, PaymentMethodConfig> = {
  visa: {
    slug: "visa",
    name: "Visa",
    shortDescription: "Pay securely with your Visa card.",
    instructions: [
      "Contact us on WhatsApp to receive the secure payment link.",
      "Confirm your project total before completing payment.",
      "Send a screenshot of the successful transaction for verification.",
    ],
    note: "Card processing is handled through our verified payment partner.",
  },
  mastercard: {
    slug: "mastercard",
    name: "Mastercard",
    shortDescription: "Pay securely with your Mastercard.",
    instructions: [
      "Message us on WhatsApp to request the payment link.",
      "Verify the invoice amount matches your agreed quote.",
      "Share your payment confirmation screenshot after checkout.",
    ],
    note: "Mastercard payments are processed via our secure partner gateway.",
  },
  payhere: {
    slug: "payhere",
    name: "PayHere",
    shortDescription: "Secure online payments via PayHere Sri Lanka.",
    instructions: [
      "Request the PayHere payment link via WhatsApp.",
      "Complete checkout on the secure PayHere gateway.",
      "Send your payment confirmation screenshot after success.",
    ],
    note: "PayHere supports local cards and popular Sri Lankan payment methods.",
  },
  paypal: {
    slug: "paypal",
    name: "PayPal",
    shortDescription: "International payments via PayPal.",
    instructions: [
      "Request our PayPal email address via WhatsApp or email.",
      "Send payment as Friends & Family only if agreed in advance.",
      "Include your project reference in the payment note.",
    ],
    accountDetails: [
      { label: "PayPal", value: "csgraphicspvt@gmail.com" },
    ],
    note: "PayPal fees may apply for Goods & Services payments.",
  },
  "bank-transfer": {
    slug: "bank-transfer",
    name: "Bank Transfer",
    shortDescription: "Direct bank transfer within Sri Lanka.",
    instructions: [
      "Request current bank details via WhatsApp before transferring.",
      "Use your full name as the payment reference.",
      "Send the bank slip or screenshot after the transfer.",
    ],
    accountDetails: [
      { label: "Bank", value: "Contact for details" },
      { label: "Account Name", value: "CS Graphics" },
    ],
    qrImage: "/payments/bank-qr-placeholder.svg",
    note: "Allow 1–2 business days for transfer verification.",
  },
  cash: {
    slug: "cash",
    name: "Cash",
    shortDescription: "In-person cash payments by appointment.",
    instructions: [
      "Schedule a meeting via WhatsApp to arrange cash payment.",
      "Payment is accepted only after project terms are confirmed.",
      "You will receive an official receipt upon payment.",
    ],
    note: "Available for local clients in Sri Lanka by prior arrangement.",
  },
  crypto: {
    slug: "crypto",
    name: "Crypto",
    shortDescription: "Cryptocurrency payments accepted.",
    instructions: [
      "Contact us to confirm accepted coins and current wallet address.",
      "Send the exact amount quoted in your invoice.",
      "Share the transaction hash (TX ID) for verification.",
    ],
    accountDetails: [
      { label: "Network", value: "USDT (TRC20) — confirm before sending" },
    ],
    qrImage: "/payments/crypto-qr-placeholder.svg",
    note: "Crypto payments are final — double-check wallet addresses.",
  },
};

export const PAYMENT_SLUGS = Object.keys(
  PAYMENT_METHODS_CONFIG
) as PaymentSlug[];

export function getPaymentBySlug(slug: string): PaymentMethodConfig | undefined {
  return PAYMENT_METHODS_CONFIG[slug as PaymentSlug];
}
