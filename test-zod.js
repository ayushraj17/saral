import { z } from "zod";

const masterFormSchema = z.object({
    rewardEvent: z.string().min(1, "Please select an event"),
    rewardType: z.string().min(1, "Please select a reward"),
    isTimeBound: z.boolean(),
    endDate: z.string().optional(),
}).refine(
    (data) => {
        if (data.isTimeBound) {
            return !!data.endDate
        }
        return true
    },
    {
        message: "Please select an end date",
        path: ["endDate"],
    }
);

try {
    const result1 = masterFormSchema.safeParse({
        rewardEvent: "post_times",
        rewardType: "flat_bonus",
        isTimeBound: false,
    });
    console.log("Result 1 (isTimeBound: false, no endDate):", JSON.stringify(result1));

    const result2 = masterFormSchema.safeParse({
        rewardEvent: "post_times",
        rewardType: "flat_bonus",
        isTimeBound: true,
    });
    console.log("Result 2 (isTimeBound: true, no endDate):", JSON.stringify(result2));
} catch (e) {
    console.error(e);
}
