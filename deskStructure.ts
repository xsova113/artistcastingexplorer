import { SeoToolsPane } from "sanity-plugin-seo-tools";

export const getDefaultDocumentNode = (S: any) => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(SeoToolsPane)
      .options({
        fetch: true,
        resolveProductionUrl: (doc:any) =>
          new URL(`https://ace-admin.sanity.studio/${doc?.slug?.current}`),
        select: (doc:any) => ({
          focus_keyword: doc.focus_keyword ?? "",
          seo_title: doc.seo_title ?? "",
          meta_description: doc.meta_description ?? "",
          focus_synonyms: doc.focus_synonyms ?? [],
        }),
        
      })
      .title("SEO"),
  ]);
};

// export default S.defaults();
