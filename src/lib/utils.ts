
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_PHONE = '919493898990';
export const WHATSAPP_DISPLAY_PHONE = '+91 9493898990';

export function getWhatsAppUrl(
  message = 'Hi Grow Big Marketers, I would like to schedule a strategy call and discuss marketing services for my business.'
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export function openWhatsApp(
  message = 'Hi Grow Big Marketers, I would like to schedule a strategy call and discuss marketing services for my business.'
): void {
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
