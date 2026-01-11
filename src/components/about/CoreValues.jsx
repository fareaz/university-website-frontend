const CoreValues = () => {
  return (
    <section className="py-20">
      <div className="px-6 max-w-11/12 mx-auto">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-slate-800">
          Our Core <span className="bg-gradient-to-r to-cyan-400 from-cyan-800
              bg-clip-text text-transparent">Values</span>
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Integrity",
              text: "Upholding honesty, transparency, and ethical standards in all academic and administrative activities.",
            },
            {
              title: "Excellence",
              text: "Striving for continuous improvement in teaching, learning, research, and services.",
            },
            {
              title: "Inclusiveness",
              text: "Creating a respectful and inclusive environment that values diversity and equal opportunity.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                relative rounded-[32px]
                bg-[#eef2f6]
                border border-slate-300/70
                shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_8px_20px_rgba(0,0,0,0.06)]
                p-8 transition
                hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]
              "
            >
              <h4 className="text-xl font-semibold text-cyan-600 mb-2">
                {item.title}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreValues;
