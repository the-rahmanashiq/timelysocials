import type { JwtPayload } from "jsonwebtoken";
import type { IUser } from "@/modules/user/user.interface";
import type { IStaticMethods } from "preline/dist";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & Partial<IUser>;
    }
  }

  interface Window {
    // Optional third-party libraries
    _;
    $: typeof import("jquery");
    jQuery: typeof import("jquery");
    DataTable;
    Dropzone;
    VanillaCalendarPro;

    // Preline UI
    HSStaticMethods: IStaticMethods;
  }
}

export {};
