import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("profile").collect();
  },
});

export const create = mutation({
  args: {
    userId: v.optional(v.string()),
    isApproved: v.optional(v.boolean()),
    firstName: v.string(),
    lastName: v.string(),
    middlename: v.optional(v.string()),
    stageName: v.optional(v.string()),
    email: v.string(),
    role: v.union(
      v.literal("actor"),
      v.literal("actress"),
      v.literal("comedian"),
      v.literal("creative_crew"),
      v.literal("dancer"),
      v.literal("idol"),
      v.literal("master_of_ceremonies"),
      v.literal("model"),
      v.literal("musician"),
      v.literal("singer"),
      v.literal("stage_performer"),
      v.literal("stunt_performer"),
      v.literal("voiceover_artist"),
      v.literal("other"),
    ),
    height: v.number(),
    gender: v.union(
      v.literal("male"),
      v.literal("female"),
      v.literal("non_binary"),
      v.literal("trans_male"),
      v.literal("trans_female"),
    ),
    bio: v.string(),
    ageMax: v.number(),
    ageMin: v.number(),
    bodyType: v.union(
      v.literal("slim"),
      v.literal("fit"),
      v.literal("curvy"),
      v.literal("muscular"),
      v.literal("extra_size"),
    ),
    agency: v.optional(v.string()),
    hairColour: v.string(),
    eyeColour: v.string(),
    credits: v.optional(
      v.object({
        category: v.string(),
        productionTitle: v.string(),
        yearOfRelease: v.number(),
        role: v.optional(v.string()),
        numberOfEpisode: v.optional(v.number()),
      }),
    ),
    instagram: v.optional(v.string()),
    twitter: v.optional(v.string()),
    tiktok: v.optional(v.string()),
    youtube: v.optional(v.string()),
    website: v.optional(v.string()),
    language: v.union(
      v.literal("english_beginner"),
      v.literal("english_intermediate"),
      v.literal("english_advanced"),
      v.literal("english_native"),
    ),
    japaneseLevel: v.union(
      v.literal("japanese_beginner"),
      v.literal("japanese_intermediate"),
      v.literal("japanese_advanced"),
      v.literal("japanese_native"),
    ),
    skills: v.array(v.string()),
    images: v.array(v.string()),
    videos: v.optional(v.array(v.string())),
    location: v.object({
      city: v.union(
        v.literal("vancouver"),
        v.literal("toronto"),
        v.literal("other_province"),
        v.literal("nationwide"),
      ),
      province: v.optional(v.union(
        v.literal("alberta"),
        v.literal("manitoba"),
        v.literal("new_brunswick"),
        v.literal("newfoundland_and_labrador"),
        v.literal("nova_scotia"),
        v.literal("prince_edward_island"),
        v.literal("quebec"),
        v.literal("saskatchewan"),
      )),
    }),
    union: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const profile = await ctx.db.insert("profile", {
      userId: args.userId ? args.userId : identity.subject,
      firstName: args.firstName,
      lastName: args.lastName,
      middlename: args.middlename,
      stageName: args.stageName,
      email: args.email,
      role: args.role,
      height: args.height,
      gender: args.gender,
      bio: args.bio,
      ageMax: args.ageMax,
      ageMin: args.ageMin,
      bodyType: args.bodyType,
      agency: args.agency,
      hairColour: args.hairColour,
      eyeColour: args.eyeColour,
      credits: args.credits,
      instagram: args.instagram,
      twitter: args.twitter,
      tiktok: args.tiktok,
      youtube: args.youtube,
      website: args.website,
      language: args.language,
      japaneseLevel: args.japaneseLevel,
      skills: args.skills,
      images: args.images,
      videos: args.videos,
      location: args.location,
      union: args.union,
      isApproved: undefined,
    });

    return profile;
  },
});
