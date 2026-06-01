import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const Signup = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const role = searchParams.get('role') || 'patient';

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const password = watch('password');

    useEffect(() => {
        if (!['patient', 'doctor'].includes(role)) {
            navigate('/role-selection');
        }
    }, [role, navigate]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        // Add role to data
        const payload = { ...data, role };
        // Remove confirmPassword
        delete payload.confirmPassword;

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            let result;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await response.json();
            } else {
                const text = await response.text();
                throw new Error(text || 'Registration failed');
            }

            if (!response.ok) {
                throw new Error(result.msg || 'Registration failed');
            }

            navigate('/login?registered=true');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title={`Create ${role === 'doctor' ? 'Doctor' : 'Patient'} Account`}
            subtitle="Join Guardian AI for a secure healthcare experience"
        >
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        error={errors.fullName?.message}
                        {...register('fullName', { required: 'Full Name is required' })}
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder={role === 'doctor' ? "dr.smith@hospital.com" : "john@example.com"}
                        error={errors.email?.message}
                        {...register('email', { required: 'Email is required' })}
                    />

                    {role === 'doctor' ? (
                        <>
                            <Input
                                label="Medical License Number"
                                placeholder="MD-12345678"
                                error={errors.medicalLicense?.message}
                                {...register('medicalLicense', { required: 'Medical License is required' })}
                            />
                            <Input
                                label="Specialization"
                                placeholder="Cardiology, General Practice, etc."
                                error={errors.specialization?.message}
                                {...register('specialization', { required: 'Specialization is required' })}
                            />
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Date of Birth"
                                    type="date"
                                    error={errors.dateOfBirth?.message}
                                    {...register('dateOfBirth', { required: 'Date of Birth is required' })}
                                />
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-sm font-medium text-foreground">Gender</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        {...register('gender', { required: 'Gender is required' })}
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.gender && <span className="text-xs text-destructive">{errors.gender.message}</span>}
                                </div>
                            </div>
                        </>
                    )}

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' }
                        })}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword', {
                            validate: value => value === password || "Passwords do not match"
                        })}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Signup;
