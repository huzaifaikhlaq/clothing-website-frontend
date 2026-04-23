import React, { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Auth = () => {
    const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'

    const [signinData, setSigninData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirm: '' });

    const [signinErrors, setSigninErrors] = useState({});
    const [signupErrors, setSignupErrors] = useState({});

    const [showSigninPass, setShowSigninPass] = useState(false);
    const [showSignupPass, setShowSignupPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [signinSuccess, setSigninSuccess] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ── Validation helpers ──────────────────────────────────────────
    const validateSignin = () => {
        const errs = {};
        if (!signinData.email.trim()) errs.email = 'Email is required.';
        else if (emailRegex.test(signinData.email))
            errs.email = 'Enter a valid email.';
        if (!signinData.password) errs.password = 'Password is required.';
        return errs;
    };

    const validateSignup = () => {
        const errs = {};
        if (!signupData.name.trim()) errs.name = 'Full name is required.';
        if (!signupData.email.trim()) errs.email = 'Email is required.';
        else if (emailRegex.test(signupData.email))
            errs.email = 'Enter a valid email.';
        if (!signupData.password) errs.password = 'Password is required.';
        else if (signupData.password.length < 8)
            errs.password = 'Password must be at least 8 characters.';
        if (!signupData.confirm) errs.confirm = 'Please confirm your password.';
        else if (signupData.password !== signupData.confirm)
            errs.confirm = 'Passwords do not match.';
        return errs;
    };

    // ── Submit handlers ─────────────────────────────────────────────
    const handleSignin = (e) => {
        e.preventDefault();
        const errs = validateSignin();
        setSigninErrors(errs);
        if (Object.keys(errs).length === 0) {
            // TODO: connect to backend
            setSigninSuccess(true);
            setTimeout(() => setSigninSuccess(false), 3000);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const errs = validateSignup();
        setSignupErrors(errs);
        if (Object.keys(errs).length === 0) {
            // TODO: connect to backend
            setSignupSuccess(true);
            setTimeout(() => setSignupSuccess(false), 3000);
            setSignupData({ name: '', email: '', password: '', confirm: '' });
        }
    };

    // ── Shared field component (keeps JSX DRY) ──────────────────────
    const Field = ({ label, error, children }) => (
        <div>
            <label className="block font-label text-[10px] uppercase tracking-[0.15em] mb-2 text-[#474747]">
                {label}
            </label>
            {children}
            {error && (
                <p className="mt-1 font-label text-[10px] text-red-500 tracking-wide">{error}</p>
            )}
        </div>
    );

    const inputCls = 'w-full bg-[#e2e2e2] border-none rounded px-4 py-3 text-sm focus:ring-0 focus:bg-white focus:border-b focus:border-black transition-all placeholder:text-[#777777]/50 outline-none';

    // ── Eye toggle button ───────────────────────────────────────────
    const EyeBtn = ({ show, onToggle }) => (
        <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777777]"
            type="button"
            onClick={onToggle}
        >
            <span className="material-symbols-outlined text-[20px]">
                {show ? <FaEye /> : <FaEyeSlash />}
            </span>
        </button>
    );

    return (
        <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 md:px-12 bg-[#f9f9f9]">
            {/* Logo */}
            <div className="mb-16">
                <h1 className="font-headline italic text-5xl tracking-[0.2em] text-black">VOIRE</h1>
            </div>

            {/* Auth Container */}
            <div className="w-full max-w-md bg-white p-8 md:p-12 transition-all duration-500 shadow-sm">

                {/* Tab Toggle */}
                <div className="flex gap-8 mb-12 border-b border-[#c6c6c6]/20">
                    <button
                        onClick={() => { setActiveTab('signin'); setSigninErrors({}); }}
                        className={`pb-4 font-label text-xs uppercase tracking-widest transition-colors ${activeTab === 'signin'
                            ? 'border-b border-black text-[#1a1c1c] font-semibold'
                            : 'text-[#777777] hover:text-[#1a1c1c]'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => { setActiveTab('signup'); setSignupErrors({}); }}
                        className={`pb-4 font-label text-xs uppercase tracking-widest transition-colors ${activeTab === 'signup'
                            ? 'border-b border-black text-[#1a1c1c] font-semibold'
                            : 'text-[#777777] hover:text-[#1a1c1c]'
                            }`}
                    >
                        Create Account
                    </button>
                </div>

                {/* ── SIGN IN FORM ──────────────────────────────────────── */}
                {activeTab === 'signin' && (
                    <form className="space-y-6" onSubmit={handleSignin} noValidate>
                        <Field label="Email" error={signinErrors.email}>
                            <input className={inputCls} placeholder="email@example.com" type="email" value={signinData.email} onChange={(e) => setSigninData({ ...signinData, email: e.target.value })} />
                        </Field>

                        <Field label="Password" error={signinErrors.password}>
                            <div className="flex justify-between items-center mb-2">
                                <span />
                                <a
                                    className="font-label text-[10px] uppercase tracking-[0.1em] text-[#777777] hover:text-black transition-colors"
                                    href="#">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <input className={inputCls} placeholder="••••••••" type={showSigninPass ? 'text' : 'password'} value={signinData.password} onChange={(e) => setSigninData({ ...signinData, password: e.target.value })} />
                                <EyeBtn show={showSigninPass} onToggle={() => setShowSigninPass(!showSigninPass)}
                                />
                            </div>
                        </Field>

                        <div className="pt-4 space-y-4">
                            {signinSuccess && (
                                <p className="font-label text-[10px] uppercase tracking-widest text-center text-green-600">
                                    ✓ Signed in successfully!
                                </p>
                            )}

                            <button
                                className="w-full bg-black text-[#e5e2e1] py-4 font-label text-xs uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-opacity rounded-none"
                                type="submit"
                            >
                                Sign In
                            </button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-[#c6c6c6]/30"></div>
                                <span className="flex-shrink mx-4 font-label text-[9px] uppercase tracking-widest text-[#777777]">or</span>
                                <div className="flex-grow border-t border-[#c6c6c6]/30"></div>
                            </div>

                            <button
                                className="w-full bg-white border border-[#c6c6c6]/50 text-[#1a1c1c] py-4 font-label text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#eeeeee] transition-colors rounded-none"
                                type="button"
                            >
                                <GoogleIcon />
                                Continue with Google
                            </button>
                        </div>

                        <p className="text-center font-label text-[10px] text-[#777777] tracking-widest pt-2">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setActiveTab('signup')}
                                className="text-black underline underline-offset-2 hover:opacity-70 transition-opacity"
                            >
                                Create one
                            </button>
                        </p>
                    </form>
                )}

                {/* ── SIGN UP FORM ──────────────────────────────────────── */}
                {activeTab === 'signup' && (
                    <form className="space-y-6" onSubmit={handleSignup} noValidate>
                        <Field label="Full Name" error={signupErrors.name}>
                            <input
                                className={inputCls}
                                placeholder="Your full name"
                                type="text"
                                value={signupData.name}
                                onChange={(e) =>
                                    setSignupData({ ...signupData, name: e.target.value })
                                }
                            />
                        </Field>

                        <Field label="Email" error={signupErrors.email}>
                            <input
                                className={inputCls}
                                placeholder="email@example.com"
                                type="email"
                                value={signupData.email}
                                onChange={(e) =>
                                    setSignupData({ ...signupData, email: e.target.value })
                                }
                            />
                        </Field>

                        <Field label="Password" error={signupErrors.password}>
                            <div className="relative">
                                <input
                                    className={inputCls}
                                    placeholder="Min. 8 characters"
                                    type={showSignupPass ? 'text' : 'password'}
                                    value={signupData.password}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, password: e.target.value })
                                    }
                                />
                                <EyeBtn
                                    show={showSignupPass}
                                    onToggle={() => setShowSignupPass(!showSignupPass)}
                                />
                            </div>
                        </Field>

                        <Field label="Confirm Password" error={signupErrors.confirm}>
                            <div className="relative">
                                <input
                                    className={inputCls}
                                    placeholder="••••••••"
                                    type={showConfirmPass ? 'text' : 'password'}
                                    value={signupData.confirm}
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, confirm: e.target.value })
                                    }
                                />
                                <EyeBtn
                                    show={showConfirmPass}
                                    onToggle={() => setShowConfirmPass(!showConfirmPass)}
                                />
                            </div>
                        </Field>

                        <div className="pt-4 space-y-4">
                            {signupSuccess && (
                                <p className="font-label text-[10px] uppercase tracking-widest text-center text-green-600">
                                    ✓ Account created successfully!
                                </p>
                            )}

                            <button
                                className="w-full bg-black text-[#e5e2e1] py-4 font-label text-xs uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-opacity rounded-none"
                                type="submit"
                            >
                                Create Account
                            </button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-[#c6c6c6]/30"></div>
                                <span className="flex-shrink mx-4 font-label text-[9px] uppercase tracking-widest text-[#777777]">or</span>
                                <div className="flex-grow border-t border-[#c6c6c6]/30"></div>
                            </div>

                            <button
                                className="w-full bg-white border border-[#c6c6c6]/50 text-[#1a1c1c] py-4 font-label text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#eeeeee] transition-colors rounded-none"
                                type="button"
                            >
                                <GoogleIcon />
                                Continue with Google
                            </button>
                        </div>

                        <p className="text-center font-label text-[10px] text-[#777777] tracking-widest pt-2">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setActiveTab('signin')}
                                className="text-black underline underline-offset-2 hover:opacity-70 transition-opacity"
                            >
                                Sign in
                            </button>
                        </p>
                    </form>
                )}
            </div>

            {/* Editorial Quote */}
            <div className="mt-24 text-center max-w-sm">
                <p className="font-headline italic text-[#474747] leading-relaxed text-lg">
                    "Fashion is the armor to survive the reality of everyday life."
                </p>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] mt-4 text-[#777777]">
                    — Editorial Excellence
                </p>
            </div>
        </main>
    );
};

// ── Google SVG isolated to keep JSX clean ──────────────────────────
const GoogleIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export default Auth;