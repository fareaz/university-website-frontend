const ContactInformation = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">
                <span className="bg-gradient-to-r to-cyan-400 from-cyan-800
              bg-clip-text text-transparent">University </span>Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="font-semibold text-lg text-cyan-600">
                            📍 Address
                        </h3>
                        <p className="text-gray-600">
                            RMIT University <br />
                            Main Campus Road <br />
                            Dhaka, Bangladesh
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="font-semibold text-lg text-cyan-600">
                            📞 Phone
                        </h3>
                        <p className="text-gray-600">
                            +880 1234 567890 <br />
                            +880 9876 543210
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="font-semibold text-lg text-cyan-600">
                            📧 Email
                        </h3>
                        <p className="text-gray-600">
                            info@rmituniversity.edu <br />
                            notice@rmituniversity.edu
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="font-semibold text-lg text-cyan-600">
                            🕒 Office Hours
                        </h3>
                        <p className="text-gray-600">
                            Sunday – Thursday <br />
                            9:00 AM – 5:00 PM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInformation;