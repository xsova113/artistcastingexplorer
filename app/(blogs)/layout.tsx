export const revalidate = 0;
const BlogsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-screen-lg px-2.5 py-20 md:px-10">
      {children}
    </div>
  );
};

export default BlogsLayout;
