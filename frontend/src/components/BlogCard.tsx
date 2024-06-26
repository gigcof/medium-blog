import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    <Avatar name={authorName} />
                    <div className="font-extralight pl-2 flex justify-center flex-col text-sm">
                        {authorName}
                    </div>
                    <div className="flex justify-center flex-col pl-2 text-sm">
                        <Circle />
                    </div>
                    <div className="font-thin pl-2 text-slate-600 flex justify-center flex-col text-sm">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">{title}</div>
                <div className="font-thin text-md">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
                    content.length / 100
                )} minute(s) read`}</div>
            </div>
        </Link>
    );
};

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
    name,
    size = "small",
}: {
    name: string;
    size?: "small" | "big";
}) {
    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
                size === "small" ? "h-6 w-6" : "h-10 w-10"
            }`}
        >
            <span
                className={`${
                    size === "small" ? "text-xs" : "text-md"
                } text-xs text-gray-600 dark:text-gray-300`}
            >
                {name[0]}
            </span>
        </div>
    );
}
