import { Mail, Phone, MapPin, type LucideIcon } from "lucide-react";

// Map icon string to Lucide component
export const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Mail,
    Phone,
    MapPin,
  };
  return iconMap[iconName] || Mail;
};
