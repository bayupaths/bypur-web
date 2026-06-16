// Unit Tests for Contact Section Utils
import { getIconComponent } from "@/components/sections/contact/utils";
import { Mail, Phone, MapPin } from "lucide-react";

describe("Contact Section Utils", () => {
  describe("getIconComponent", () => {
    it("should return Mail icon for 'Mail' string", () => {
      const icon = getIconComponent("Mail");
      expect(icon).toBe(Mail);
    });

    it("should return Phone icon for 'Phone' string", () => {
      const icon = getIconComponent("Phone");
      expect(icon).toBe(Phone);
    });

    it("should return MapPin icon for 'MapPin' string", () => {
      const icon = getIconComponent("MapPin");
      expect(icon).toBe(MapPin);
    });

    it("should return Mail as default for unknown icon", () => {
      const icon = getIconComponent("Unknown");
      expect(icon).toBe(Mail);
    });

    it("should be case-sensitive", () => {
      const icon = getIconComponent("mail"); // lowercase
      expect(icon).toBe(Mail); // should return default
    });
  });
});
