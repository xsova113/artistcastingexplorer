// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { talentFormSchema } from "@/lib/talentFormSchema";
// import { UseFormReturn } from "react-hook-form";
// import z from "zod";
// // import VideoUpload from "./VideoUpload";
// import { Input } from "@/components/ui/input";

// interface VideoFormFieldProps {
//   form: UseFormReturn<z.infer<typeof talentFormSchema>>;
//   // setFilesToDelete: (values: string[]) => void;
//   // filesToDelete: string[];
// }

// const VideoFormField = ({
//   form, // setFilesToDelete,
// } // filesToDelete,
// : VideoFormFieldProps) => {
//   return (
//     <>
//       <FormField
//         control={form.control}
//         name="videoName"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Video Title</FormLabel>
//             <FormControl>
//               <Input
//                 placeholder="Video title"
//                 {...field}
//                 disabled={form.formState.isSubmitting}
//                 defaultValue={field.value}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <FormField
//         control={form.control}
//         name="videoUrl"
//         render={({ field }) => (
//           <FormItem className="flex flex-col">
//             <FormLabel>Video Url</FormLabel>
//             <FormControl>
//               <Input
//                 placeholder="Video url"
//                 {...field}
//                 disabled={form.formState.isSubmitting}
//                 defaultValue={field.value}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     </>

//     // <FormField
//     //   control={form.control}
//     //   name="videos"
//     //   render={({ field }) => (
//     //     <FormItem>
//     //       <FormLabel>Upload Videos</FormLabel>
//     //       <FormControl>
//     //       <Input
//     //           {...field}
//     //           required
//     //           placeholder="Video name"
//     //           disabled={form.formState.isSubmitting}
//     //         />
//     //         <VideoUpload
//     //           disabled={form.formState.isSubmitting}
//     //           values={field.value || []}
//     //           onChange={field.onChange}
//     //           onRemove={async ({ url, fileKey }) => {
//     //             field.onChange(
//     //               field.value
//     //                 ? [...field.value.filter((current) => current.url !== url)]
//     //                 : [],
//     //             );
//     //             setFilesToDelete([...filesToDelete, fileKey]);
//     //           }}
//     //         />
//     //       </FormControl>
//     //       <FormMessage />
//     //     </FormItem>
//     //   )}
//     // />
//   );
// };

// export default VideoFormField;
