import { Link } from "react-router-dom";
import { postRequest } from "../requests/requests";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validEmail || !password) {
      setError("Please fill in all required fields correctly");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const response = await postRequest('/auth/login/', { email, password });
      setAccessToken(response.data.access_token);
      setSuccess(true);
      setShowSuccessPopup(true); // Show success popup

      setTimeout(() => {
        window.location.assign('/');
      }, 2000);

    } catch (err: any) {
      if (!err.response?.data) {
        setError(err.message);
      } else {
        setError(err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isEmailValid = () => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidEmail(regex.test(email));
    };

    if (email) {
      isEmailValid();
    } else {
      setValidEmail(false);
    }

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  }, [email, password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isEmailTouched) {
      setIsEmailTouched(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 animate-scaleIn">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h3>
              <p className="text-gray-600">
                Welcome back! You're being redirected to your dashboard.
              </p>
            </div>

            {/* Loading Indicator */}
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-progressBar"></div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                Redirecting in 2 seconds...
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-600">Courses</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">85%</div>
                  <div className="text-xs text-gray-600">Progress</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">3</div>
                  <div className="text-xs text-gray-600">New</div>
                </div>
              </div>
            </div>

            {/* Close Button (optional) */}
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Go to Dashboard Now
            </button>
          </div>
        </div>
      )}

      {/* Original Login Form */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
        <div className="w-full max-w-md">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex justify-center items-center">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/80 shadow-xl p-6 sm:p-8">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none rounded-2xl"></div>

            {/* Logo/Header Section - Compact */}
            <div className="text-center mb-8">
              {/* Minimal logo */}
              <div className="relative mx-auto mb-4 w-fit">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur opacity-30"></div>
                <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-white tracking-tighter">L</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">Welcome Back</h2>
              <p className="text-gray-600 text-sm font-light">Sign in to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => setIsEmailTouched(true)}
                    disabled={loading}
                    className={`block w-full pl-10 pr-10 py-2.5 bg-white/50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed
                      ${isEmailTouched && email
                        ? validEmail
                          ? 'border-green-500 focus:border-green-500 focus:ring-green-500/30'
                          : 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/30'
                      }`}
                    placeholder="you@example.com"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className={`h-4 w-4 transition-colors ${isEmailTouched && email
                      ? validEmail
                        ? 'text-green-500'
                        : 'text-red-500'
                      : 'text-gray-400 group-focus-within:text-blue-500'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  {/* Validation Icon */}
                  {isEmailTouched && email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      {validEmail ? (
                        <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>

                {/* Validation Message */}
                {isEmailTouched && email && (
                  <p className={`mt-1.5 text-xs flex items-center gap-1 ${validEmail ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {validEmail ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Valid email format
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Please enter a valid email address
                      </>
                    )}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="block w-full pl-10 pr-10 py-2.5 bg-white/50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    disabled={loading}
                    className="h-3.5 w-3.5 bg-white border-gray-300 rounded focus:ring-blue-500/30 focus:ring-offset-white text-blue-500 disabled:opacity-50"
                  />
                  <label htmlFor="remember" className="ml-2 text-xs text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:text-blue-500 transition-colors disabled:opacity-50"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={!validEmail || !password || loading}
                className={`w-full py-2.5 px-4 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transform transition-all duration-200 shadow hover:shadow-md text-sm flex items-center justify-center
                  ${validEmail && password && !loading
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 cursor-pointer'
                    : 'bg-gradient-to-r from-gray-400 to-gray-300 cursor-not-allowed'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Alternative Login Options - Compact */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={loading}
                  className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm hover:shadow text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  </svg>
                  <span className="text-gray-700">Google</span>
                </button>
                <button
                  type="button"
                  disabled={loading}
                  className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm hover:shadow text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-gray-700">GitHub</span>
                </button>
              </div>

              {/* Signup Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-xs">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Terms */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 leading-tight">
              By signing in, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500 hover:underline transition-colors">Terms</a> and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500 hover:underline transition-colors">Privacy</a>
            </p>
          </div>
        </div>
      </section>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-progressBar {
          animation: progressBar 2s linear forwards;
        }
      `}</style>
    </>
  );
};

export default Login;