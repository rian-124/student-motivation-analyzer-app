import WorkFlow from "../components/WorkFlow";

export default function FlowSystemSection() {
  return (
    <section className="w-full min-h-screen mt-30 mb-20">
         <div className="my-12 text-center">
            <h1 className="text-4xl font-bold text-brand">Flow</h1>
            <h1 className="text-4xl font-bold text-brand-secondary">System</h1>
        </div>
      <WorkFlow />
    </section>
  );
}
