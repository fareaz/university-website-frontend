const AboutOverview = () => {
  return (
    <section className="py-14">
      <div className="max-w-11/12 mx-auto px-8">
        <h2 className="text-3xl font-semibold mb-6">
          <span
            className="bg-gradient-to-r to-cyan-400 from-cyan-800
              bg-clip-text text-transparent"
          >
            University
          </span>{" "}
          Overview
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          RMIT University is a modern higher education institution dedicated to
          providing quality education and research opportunities to students
          from diverse backgrounds. We emphasize both theoretical knowledge and
          practical skills to prepare students for real-world challenges.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Our university fosters a culture of integrity, inclusiveness, and
          lifelong learning. Through innovative teaching methods, experienced
          faculty members, and modern infrastructure, we strive to create a
          dynamic academic environment.
        </p>
      </div>
    </section>
  );
};

export default AboutOverview;
