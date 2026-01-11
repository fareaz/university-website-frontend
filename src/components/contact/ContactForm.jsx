const ContactForm = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">
                Send Us a <span className="bg-gradient-to-r to-cyan-400 from-cyan-800
              bg-clip-text text-transparent">Message</span>
            </h2>

            <div className="card bg-base-100 shadow">
                <div className="card-body space-y-4">

                    <div>
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Email Address</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Subject</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Subject"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={4}
                            placeholder="Write your message here..."
                        ></textarea>
                    </div>

                    <button className="btn bg-gradient-to-r from-cyan-400 to-cyan-800 text-white w-full">
                        Send Message
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ContactForm;