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
  const isRight = position === "right";

  return (
    <li className="relative w-full md:h-[80vh]">
      <div className="w-full md:h-full md:sticky md:top-0 flex items-center">
        {/* Timeline dot indicator - mobile left, desktop center */}
        <div className="absolute left-5 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-30">
          <div className="w-11 h-11 md:w-16 md:h-16 bg-white border-2 md:border-4 border-brand rounded-full flex items-center justify-center shadow-xl ring-4 md:ring-8 ring-brand/5 group hover:scale-110 transition-transform duration-300">
            <Workflow
              size={20}
              className="text-brand-secondary md:text-brand-secondary group-hover:rotate-12 transition-transform"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:h-full md:items-center">
          {/* Left Slot */}
          <div
            className={`flex md:justify-end px-4 md:px-6 md:pr-16 lg:pr-24 pb-8 md:pb-0 ${isRight ? "md:flex md:invisible" : "z-20"}`}
          >
            {!isRight && (
              <div className="group p-8 md:p-8 pt-16 md:pt-8 ml-20 md:ml-0 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/60 transition-all duration-500 hover:-translate-y-2 w-full md:max-w-md">
                <div className="flex flex-col space-y-4 md:space-y-4 text-start">
                  <div className="inline-block self-start px-4 py-1.5 md:px-3 md:py-1 rounded-lg bg-brand text-white text-xs font-bold shadow-md uppercase tracking-wider">
                    {date}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-2xl text-brand-secondary font-black tracking-tight leading-none group-hover:text-brand transition-colors">
                      {title}
                    </h3>
                    <p className="text-brand-secondary/40 font-bold text-sm md:text-sm uppercase tracking-widest">
                      {subTitle}
                    </p>
                  </div>
                  <p className="text-brand-secondary/70 leading-relaxed text-base md:text-base font-medium">
                    {description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Slot */}
          <div
            className={`flex md:justify-start px-4 md:px-6 md:pl-16 lg:pl-24 pb-8 md:pb-0 ${!isRight ? "md:flex md:invisible" : "z-20"}`}
          >
            {isRight && (
              <div className="group p-8 md:p-8 pt-16 md:pt-8 ml-20 md:ml-0 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/60 transition-all duration-500 hover:-translate-y-2 w-full md:max-w-md">
                <div className="flex flex-col space-y-3 md:space-y-4 text-start">
                  <div className="inline-block self-start px-3 py-1 rounded-lg bg-brand text-white text-xs font-bold shadow-md uppercase tracking-wider">
                    {date}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl text-brand-secondary font-black tracking-tight leading-none group-hover:text-brand transition-colors">
                      {title}
                    </h3>
                    <p className="text-brand-secondary/40 font-bold text-xs md:text-sm uppercase tracking-widest">
                      {subTitle}
                    </p>
                  </div>
                  <p className="text-brand-secondary/70 leading-relaxed text-sm md:text-base font-medium">
                    {description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
