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
    <li className="relative w-full h-[100vh] md:h-[80vh]">
      <div className="w-full h-full sticky top-0 flex items-center">
        {/* Center Icon Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
          <div className="w-16 h-16 bg-white border-4 border-brand rounded-full flex justify-center items-center shadow-xl ring-8 ring-brand/5 group hover:scale-110 transition-transform duration-300">
            <Workflow size={28} className="text-brand-secondary group-hover:rotate-12 transition-transform" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full items-center">
          {/* Left Slot */}
          <div className={`flex justify-end px-6 md:pr-16 lg:pr-24 ${isRight ? "hidden md:flex md:invisible" : "z-20"}`}>
            {!isRight && (
              <div className="group p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/60 transition-all duration-500 hover:-translate-y-2 max-w-md w-full">
                <div className="flex flex-col space-y-4 text-start">
                  <div className="inline-block self-start px-3 py-1 rounded-lg bg-brand text-white text-xs font-bold shadow-md uppercase tracking-wider">
                    {date}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl text-brand-secondary font-black tracking-tight leading-none group-hover:text-brand transition-colors">
                      {title}
                    </h3>
                    <p className="text-brand-secondary/40 font-bold text-sm uppercase tracking-widest">
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

          {/* Right Slot */}
          <div className={`flex justify-start px-6 md:pl-16 lg:pl-24 ${!isRight ? "hidden md:flex md:invisible" : "z-20"}`}>
            {isRight && (
              <div className="group p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/60 transition-all duration-500 hover:-translate-y-2 max-w-md w-full">
                <div className="flex flex-col space-y-4 text-start">
                  <div className="inline-block self-start px-3 py-1 rounded-lg bg-brand text-white text-xs font-bold shadow-md uppercase tracking-wider">
                    {date}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl text-brand-secondary font-black tracking-tight leading-none group-hover:text-brand transition-colors">
                      {title}
                    </h3>
                    <p className="text-brand-secondary/40 font-bold text-sm uppercase tracking-widest">
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
