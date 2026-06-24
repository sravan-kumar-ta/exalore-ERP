import { z } from "zod";

export const itemFormSchema = z.object({
   itemCode: z.string().optional().default(""),
   name1: z.string().min(1, "Name 1 is required"),
   name2: z.string().optional().default(""),
   genericName: z.string().optional().default(""),
   description: z.string().optional().default(""),
   behaviour: z.string().min(1, "Behaviour is required"),
   groupCode: z.string().min(1, "Group code is required"),
   status: z.string().min(1, "Status is required"),
   taxableStatus: z.string().min(1, "Taxable status is required"),
   shelfCode: z.string().optional().default(""),
   manufacturer: z.string().optional().default(""),
   editName: z.boolean().optional().default(false),
});

export const INITIAL_FORM = {
   itemCode: "",
   name1: "",
   name2: "",
   genericName: "",
   description: "",
   behaviour: "",
   groupCode: "",
   status: "",
   taxableStatus: "",
   shelfCode: "",
   manufacturer: "",
   editName: false,
};
