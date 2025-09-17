import { useState } from 'react';
import BorderAnimatedContainer from '../components/BorderAnimated';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

function SignUpPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative w-full max-w-5xl md:h-[750px] h-auto rounded-2xl shadow-xl overflow-hidden">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row bg-slate-900/80 backdrop-blur-xl rounded-2xl">

            {/* FORM COLUMN LEFT SIDE */}
            <div className="md:w-1/2 p-10 flex items-center justify-center md:border-r border-slate-700/40">
              <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-10">
                  <MessageCircleIcon className="w-14 h-14 mx-auto text-indigo-400 mb-4" />
                  <h2 className="text-3xl font-extrabold text-slate-100 mb-2">Create Account</h2>
                  <p className="text-slate-400 text-sm">Join us and start chatting instantly 🚀</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full name */}
                  <div>
                    <label className="auth-input-label">User Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="input focus:ring-2 focus:ring-indigo-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input focus:ring-2 focus:ring-indigo-500"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Create Account"
                    )}
                  </button>

                </form>

                {/* Login link */}
                <div className="mt-8 text-center">
                  <p className="text-slate-400 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link font-semibold text-indigo-400 hover:text-indigo-300">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Start Your Journey Today</h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
