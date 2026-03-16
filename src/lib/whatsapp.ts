import type { Product, CartItem } from "@/types/product";

// Replace with your actual WhatsApp business number (include country code, no + or spaces)
export const WHATSAPP_NUMBER = "1234567890";

export function generateProductMessage(
  product: Product,
  quantity: number = 1,
  size?: string
): string {
  let message = `Hi! I'm interested in ordering from MAISON:\n\n`;
  message += `*${product.name}*\n`;
  message += `Price: $${product.price.toLocaleString()}\n`;
  message += `Quantity: ${quantity}\n`;
  if (size) message += `Size: ${size}\n`;
  message += `\nTotal: $${(product.price * quantity).toLocaleString()}\n`;
  message += `\nPlease confirm availability and share payment details. Thank you!`;
  return message;
}

export function generateCartMessage(items: CartItem[]): string {
  if (items.length === 0) return "Hi! I'd like to place an order from MAISON.";

  let message = `Hi! I'd like to place an order from MAISON:\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   Price: $${item.product.price.toLocaleString()} x ${item.quantity}\n`;
    if (item.selectedSize) message += `   Size: ${item.selectedSize}\n`;
    if (item.selectedColor) message += `   Color: ${item.selectedColor}\n`;
    message += `   Subtotal: $${(item.product.price * item.quantity).toLocaleString()}\n\n`;
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  message += `*Order Total: $${total.toLocaleString()}*\n`;
  message += `\nPlease confirm availability and share payment details. Thank you!`;
  return message;
}

export function openWhatsApp(message: string, phone: string = WHATSAPP_NUMBER) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
}
