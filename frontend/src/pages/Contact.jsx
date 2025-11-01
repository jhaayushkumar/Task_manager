import { GlowingEffect } from "../components/ui/GlowingEffect";
import { HoverBorderGradient } from "../components/ui/HoverBorderGradient";
import { FiGithub, FiLinkedin, FiMail, FiGlobe } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="pointer-events-none absolute inset-0 -z-10 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-6">
        <section className="text-center text-gray-200 mb-6">
          <h1 className="text-3xl font-extrabold">Contact</h1>
          <p className="opacity-80">Creator details and a simple contact form</p>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden isolate rounded-2xl shadow-md border border-white/10 ring-1 ring-white/10 p-6">
            <GlowingEffect />
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">A</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-100">Your Name</h2>
                <p className="text-gray-400 text-sm">Creator • Full‑Stack Developer</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-gray-300 text-sm">
              <p>Email: <a href="mailto:your.email@example.com" className="text-indigo-400 hover:underline">your.email@example.com</a></p>
              <p>Website: <a href="https://yourwebsite.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">yourwebsite.com</a></p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="group inline-flex">
                <HoverBorderGradient containerClassName="rounded-full" as="div">
                  <a
                    aria-label="GitHub"
                    href="https://github.com/yourhandle"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 bg-gray-900/70 flex items-center justify-center text-gray-200 hover:text-white"
                  >
                    <FiGithub />
                  </a>
                </HoverBorderGradient>
              </div>
              <div className="group inline-flex">
                <HoverBorderGradient containerClassName="rounded-full" as="div">
                  <a
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/in/yourhandle"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 bg-gray-900/70 flex items-center justify-center text-gray-200 hover:text-white"
                  >
                    <FiLinkedin />
                  </a>
                </HoverBorderGradient>
              </div>
              <div className="group inline-flex">
                <HoverBorderGradient containerClassName="rounded-full" as="div">
                  <a
                    aria-label="Email"
                    href="mailto:your.email@example.com"
                    className="w-10 h-10 rounded-full border border-white/10 bg-gray-900/70 flex items-center justify-center text-gray-200 hover:text-white"
                  >
                    <FiMail />
                  </a>
                </HoverBorderGradient>
              </div>
              <div className="group inline-flex">
                <HoverBorderGradient containerClassName="rounded-full" as="div">
                  <a
                    aria-label="Website"
                    href="https://yourwebsite.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 bg-gray-900/70 flex items-center justify-center text-gray-200 hover:text-white"
                  >
                    <FiGlobe />
                  </a>
                </HoverBorderGradient>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form className="relative overflow-hidden isolate rounded-2xl shadow-md border border-white/10 ring-1 ring-white/10 p-6">
            <GlowingEffect />
            <h2 className="text-xl font-semibold text-gray-100">Say hello</h2>
            <div className="grid gap-3 mt-3">
              <input className="border border-white/10 p-3 rounded bg-gray-900/70 text-gray-100 placeholder-gray-400" placeholder="Your name" />
              <input className="border border-white/10 p-3 rounded bg-gray-900/70 text-gray-100 placeholder-gray-400" placeholder="Your email" />
              <textarea rows={5} className="border border-white/10 p-3 rounded bg-gray-900/70 text-gray-100 placeholder-gray-400" placeholder="Message" />
              <div className="group inline-flex w-full">
                <HoverBorderGradient containerClassName="rounded-md w-full" as="div" className="w-full">
                  <button type="button" className="w-full px-4 py-2 rounded-md bg-white text-indigo-600 font-semibold">Send</button>
                </HoverBorderGradient>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;


