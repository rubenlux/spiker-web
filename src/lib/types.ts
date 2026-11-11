export type UserSegment = "personal" | "business" | "partner" | "organization";

export interface EarlyAccessFormData {
  fullName: string;
  email: string;
  country: string;
  userType: UserSegment;
  deviceModel: string;
  intendedUse: string;
  consent: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  inquiryType: "enterprise" | "partnership" | "support" | "press";
  message: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface UseCaseItem {
  id: string;
  title: string;
  domain: string;
  badge: string;
  description: string;
  icon: string;
  features: string[];
}

export interface CapabilityItem {
  title: string;
  stage: "CURRENT" | "DEVELOPMENT" | "EXPLORATION";
  stageLabel: string;
  stageColor: string;
  description: string;
  items: string[];
}

