// rrd
import { useParams } from "react-router-dom";

// lib
import { findData } from "../lib/my-utils";

// redux
import { useSelector } from "react-redux";

// flowbite
import { Card } from "flowbite-react";

export default function SingleProduct() {
  const { article } = useSelector((state) => state.article);
  const { id } = useParams();

  const thatObj = (article && findData(article, +id)) || {};
  const { title, category, createdDate, description, readTime, author } =
    thatObj;

  return (
    <>
      {article && (
        <div className="mx-auto h-full w-full max-w-[600px] px-10 py-5">
          <Card className="h-full w-full">
            <div className="flex h-full w-full items-center justify-around">
              <img
                src={author.avatar}
                alt={author.name}
                width={220}
                height={220}
                style={{
                  borderRadius: "50%",
                  border: "2px solid black",
                  objectFit: "cover",
                }}
              />
              {/* <div className="h-full w-[2px] bg-black"></div> */}
              <div className="py-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {author.name}
                </h5>
              </div>
            </div>
            <div className="mb-5 mt-2.5 flex justify-between">
              <div>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {title}
                </h5>
                <span className="mr-2 rounded bg-cyan-100 px-2.5  text-xs font-semibold capitalize text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                  Category: {category}
                </span>
              </div>
              <div>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  CreatedDate: {createdDate}
                </h5>
                <span className="mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                  Reading time: {readTime}
                </span>
              </div>
            </div>
            <h4>{description}</h4>
          </Card>
        </div>
      )}
    </>
  );
}
