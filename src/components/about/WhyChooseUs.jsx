const WhyChooseUs = () => {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-11/12 mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center  mb-10">
          Why <span className="bg-gradient-to-r to-cyan-400 from-cyan-800
              bg-clip-text text-transparent"> Choose</span> RMIT ?
        </h2>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">

          <ul className="space-y-4 text-gray-700 list-disc pl-6">
            <li>Experienced and dedicated faculty members</li>
            <li>Modern campus and learning facilities</li>
            <li>Student-centered academic environment</li>
            <li>Career-focused education and training</li>
          </ul>

          <ul className="space-y-4 text-gray-700 list-disc pl-6">
            <li>Strong academic governance</li>
            <li>Technology-driven learning system</li>
            <li>Supportive student services</li>
            <li>Commitment to innovation and research</li>
          </ul>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
