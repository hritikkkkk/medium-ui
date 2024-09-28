
import { Blog } from "../hooks";



export const FullBlog = ({ blog }: { blog: Blog}) => {
  return (
    <div>
     
        <div className="shadow-2xl max-w-full bg-stone-200 rounded-md mx-10">
          <div className="px-10  ">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd December 2023</div>
            <div className="pt-4">{blog.content}</div>
          </div>
      </div>
    </div>
  );
};
