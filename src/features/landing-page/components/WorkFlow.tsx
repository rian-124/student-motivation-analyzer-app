"use client";

import WorkFlowItem from "./WorkFlowItem";

export default function WorkFlow() {
  return (
    <ol className="relative border-gray-200 md:border-l-0 md:flex md:flex-col md:items-center text-white">
      {/* Garis vertikal */}
      <div className="absolute md:left-1/2 w-1 h-full  transform md:-translate-x-1/2 bg-black rounded-xl"></div>
      <WorkFlowItem
        position="left"
        date="2023"
        title="Work Flow Item 1"
        subTitle="Sub Title 1"
        description="Description 1"
      />
      <WorkFlowItem
        position="right"
        date="2023"
        title="Work Flow Item 1"
        subTitle="Sub Title 1"
        description="Description 1"
      />
      <WorkFlowItem
        position="left"
        date="2023"
        title="Work Flow Item 1"
        subTitle="Sub Title 1"
        description="Description 1"
      />
    </ol>
  );
}
