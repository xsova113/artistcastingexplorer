/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { SeoToolsPane } from "sanity-plugin-seo-tools";
import {SEOPane} from 'sanity-plugin-seo-pane'

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    deskTool({
      // structure: (S) => {
      //   S.document().views([
      //     S.view.form(),
      //     S.view
      //     .component()
      //     .options({
      //       // Retrieve the keywords and synonyms at the given dot-notated strings
      //       keywords: `seo.keywords`,
      //       synonyms: `seo.synonyms`,
      //       // url: (doc) => resolveProductionUrl(doc),
        
      //       // Alternatively, specify functions (may be async) to extract values
      //       // keywords: doc => doc.seo?.keywords,
      //       // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
      //       // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
      //     })
      //     .title('SEO')
      //   ]);
      // },
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
