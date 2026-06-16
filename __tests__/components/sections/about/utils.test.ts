// Unit Tests for About Section Utils
import { getYearLabel } from "@/components/sections/about/utils";
import type { Profile } from "@/lib/types";

describe("About Section Utils", () => {
  describe("getYearLabel", () => {
    it("should return custom year label from profile", () => {
      const profile: Profile = {
        name: "Test",
        title: "Developer",
        bio: "Bio",
        email: "test@test.com",
        location: "ID",
        avatar: "/avatar.png",
        about: {
          yearLabel: "years",
        },
        socials: {},
      };

      expect(getYearLabel(profile)).toBe("years");
    });

    it("should return default 'years' when no custom label", () => {
      const profile: Profile = {
        name: "Test",
        title: "Developer",
        bio: "Bio",
        email: "test@test.com",
        location: "ID",
        avatar: "/avatar.png",
        socials: {},
      };

      expect(getYearLabel(profile)).toBe("years");
    });

    it("should return default when about is undefined", () => {
      const profile: Profile = {
        name: "Test",
        title: "Developer",
        bio: "Bio",
        email: "test@test.com",
        location: "ID",
        avatar: "/avatar.png",
        about: undefined,
        socials: {},
      };

      expect(getYearLabel(profile)).toBe("years");
    });
  });
});
