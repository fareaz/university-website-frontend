"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";

// background image
import registerBg from "@/asset/Auth/register.jpg";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post("/auth/register", data);

      await Swal.fire({
        icon: "success",
        title: "Account created successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/login");
    } catch (error: any) {
      await Swal.fire(
        "Error",
        error?.response?.data?.message || "Registration failed",
        "error"
      );
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-302px)] flex items-center justify-center">

      {/* Background Image */}
      <Image
        src={registerBg}
        alt="Register background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-6">

        {/* LEFT TEXT */}
        <div className="hidden md:flex flex-col justify-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-white/80 max-w-md">
            Create your account to access university notices, departments,
            and academic resources in one secure platform.
          </p>
        </div>

        {/* RIGHT GLASS FORM */}
        <div className="flex justify-center">
          <div
            className="
              w-full max-w-sm
              rounded-[28px]
              p-8
              bg-white/30 backdrop-blur-lg
              border border-white/60
              shadow-[0_20px_40px_rgba(0,0,0,0.25)]
              relative overflow-hidden
            "
          >
            {/* inner glass highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]" />

            {/* glass shine */}
            <div className="pointer-events-none absolute -top-14 -left-14 w-40 h-40 bg-white/40 rounded-full blur-3xl" />

            <div className="relative z-10">

              {/* Title */}
              <h3 className="text-3xl font-bold text-center text-white mb-1">
                Register
              </h3>
              <p className="text-center text-sm text-white/80 mb-6">
                Create a new account to continue
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="flex flex-col gap-y-4">

                  <input
                    placeholder="Full name"
                    className="
                      input w-full
                      rounded-full
                      bg-white/70
                      border border-white/60
                      focus:outline-none focus:border-cyan-500
                    "
                    {...register("name", { required: true })}
                  />

                  <input
                    type="email"
                    placeholder="Email address"
                    className="
                      input w-full
                      rounded-full
                      bg-white/70
                      border border-white/60
                      focus:outline-none focus:border-cyan-500
                    "
                    {...register("email", { required: true })}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="
                      input w-full
                      rounded-full
                      bg-white/70
                      border border-white/60
                      focus:outline-none focus:border-cyan-500
                    "
                    {...register("password", { required: true })}
                  />

                  <button className="btn bg-cyan-500 hover:bg-cyan-600 text-white w-full rounded-full mt-2">
                    Register
                  </button>

                </fieldset>
              </form>

              {/* Login link */}
              <p className="text-center text-sm mt-5 text-white/90">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-cyan-500 hover:underline"
                >
                  Login
                </Link>
              </p>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
