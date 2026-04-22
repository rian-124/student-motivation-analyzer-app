import { Workflow } from "lucide-react";

interface WorkFlowItemProps {
  position?: "left" | "right";
  date: string;
  title: string;
  subTitle: string;
  description: string;
}

export default function WorkFlowItem({
  position,
  date,
  title,
  subTitle,
  description,
}: WorkFlowItemProps) {
  return (
    <li className="relative mb-10 w-full h-[200vh] md:text-right">
      <div
        className={`w-full flex flex-col md:flex ${
          position === "right" ? "md:flex-row" : "md:flex-row-reverse"
        } md:justify-between md:items-center sticky top-1/3`}
      >
        <div className="absolute  -left-7 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:w-20 md:h-20 w-16 h-16 bg-brand rounded-full border-4 border-black p-3 flex justify-center items-center group">
          <Workflow size={40} className="text-black" />
        </div>
        <div
          className={`pl-10 md:gap-40 gap-4 md:px-0 w-full  ${
            position === "right" ? "md:flex-row" : "md:flex-row-reverse"
          } md:justify-between md:items-center flex flex-col`}
        >
          <div className="p-2 self-center bg-brand rounded-xl text-white w-full flex justify-center shadow-button">
            <time className="mb-1 text-sm uppercase font-normal leading-none opacity-100 text-black">
              {date}
            </time>
          </div>
          <div
            className={`w-full md:p-10 p-5 rounded-xl text-start  space-y-2 shadow-button`}
          >
            <div className="space-y-2">
              <h3 className="text-2xl text-black font-bold uppercase font-mono">
                {title}
              </h3>
              <h3 className="text-lg text-black font-mono">{subTitle}</h3>
            </div>
            <p className="mb-4 md:text-sm text-xs font-normal text-justify text-black">
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
