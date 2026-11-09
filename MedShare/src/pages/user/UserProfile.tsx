import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
interface IUserProfile {
    name: string;
    email: string;
    phone: string;
}
function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<IUserProfile>();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get("/users/profile");
                const userData = response.data.user || response.data;
                reset({
                    name: userData.name || "",
                    email: userData.email || "",
                    phone: userData.phone || "",
                });
                localStorage.setItem("user", JSON.stringify(userData));
            } catch (error: any) {
                console.error("Failed to fetch profile:", error);
                setError(
                    error.response?.data?.message ||
                    "Unable to fetch profile."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [reset]);
    const onSubmit = async (data: IUserProfile) => {
        try {
            const response = await axiosInstance.put("/users/profile", data);
            const updatedUser = response.data.user || response.data;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            alert(
                response.data.message ||
                "Profile updated successfully!"
            );
            reset({
                name: updatedUser.name || data.name,
                email: updatedUser.email || data.email,
                phone: updatedUser.phone || data.phone,
            });
        } catch (error: any) {
            console.error("Profile update failed:", error);
            alert(
                error.response?.data?.message ||
                "Unable to update profile."
            );
        }
    };
    if (loading) {
        return (
            <div style={styles.loadingPage}>
                <div style={styles.spinner}></div>
                <h3 style={{ color: "#005b70" }}>
                    Loading Profile...
                </h3>
            </div>
        );
    }
    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <div style={styles.avatar}>👤</div>

                    <h2 style={styles.heading}>My Profile</h2>

                    <p style={styles.subtitle}>
                        Manage your personal information
                    </p>
                </div>
                <div style={styles.content}>
                    {error && (
                        <div style={styles.errorBox}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                style={styles.input}
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.name && (
                                <p style={styles.validation}>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                style={styles.input}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value:
                                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Enter a valid email",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p style={styles.validation}>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter your 10-digit phone number"
                                style={styles.input}
                                {...register("phone", {
                                    required:
                                        "Phone number is required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message:
                                            "Enter a valid 10-digit phone number",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <p style={styles.validation}>
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                ...styles.updateButton,
                                opacity: isSubmitting ? 0.7 : 1,
                            }}
                        >
                            {isSubmitting
                                ? "Updating Profile..."
                                : "✦ Update Profile"}
                        </button>
                    </form>
                    <Link
                        to="/user/dashboard"
                        style={styles.backLink}
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
const styles: { [key: string]: React.CSSProperties } = {
    page: {
        minHeight: "100vh",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
            "linear-gradient(135deg, #eaf8f7, #f5fafa, #e3f4f3)",
        fontFamily: "Roboto, Arial, sans-serif",
    },
    card: {
        width: "100%",
        maxWidth: "520px",
        backgroundColor: "#ffffff",
        borderRadius: "22px",
        overflow: "hidden",
        boxShadow: "0 15px 45px rgba(0, 91, 112, 0.12)",
        border: "1px solid #dceeee",
    },
    header: {
        background: "linear-gradient(135deg, #005b70, #008f95)",
        textAlign: "center",
        padding: "38px 25px",
        color: "white",
    },
    avatar: {
        width: "85px",
        height: "85px",
        margin: "0 auto 15px",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.18)",
        border: "3px solid rgba(255,255,255,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "38px",
    },
    heading: {
        margin: 0,
        fontSize: "30px",
        fontWeight: 800,
        letterSpacing: "0.5px",
    },
    subtitle: {
        margin: "10px 0 0",
        color: "#d8f5f3",
        fontSize: "15px",
    },
    content: {
        padding: "35px",
    },
    field: {
        marginBottom: "24px",
    },
    label: {
        display: "block",
        marginBottom: "9px",
        color: "#005b70",
        fontSize: "15px",
        fontWeight: 700,
    },
    input: {
        width: "100%",
        padding: "14px 16px",
        border: "1.5px solid #d5e8e8",
        borderRadius: "10px",
        backgroundColor: "#faffff",
        fontSize: "15px",
        color: "#263b3d",
        outline: "none",
        boxSizing: "border-box",
    },
    validation: {
        margin: "7px 0 0",
        color: "#d32f2f",
        fontSize: "13px",
    },
    errorBox: {
        padding: "12px 15px",
        marginBottom: "20px",
        borderRadius: "9px",
        backgroundColor: "#fff0f0",
        border: "1px solid #ffcaca",
        color: "#c62828",
        fontSize: "14px",
    },
    updateButton: {
        width: "100%",
        padding: "15px",
        border: "none",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #008f95, #005b70)",
        color: "white",
        fontSize: "16px",
        fontWeight: 700,
        cursor: "pointer",
        marginTop: "5px",
    },
    backLink: {
        display: "block",
        textAlign: "center",
        marginTop: "25px",
        color: "#008f95",
        fontSize: "15px",
        fontWeight: 600,
        textDecoration: "none",
    },
    loadingPage: {
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#005b70",
    },
    spinner: {
        width: "45px",
        height: "45px",
        border: "4px solid #dceeee",
        borderTop: "4px solid #008f95",
        borderRadius: "50%",
        animation: "profile-spin 0.8s linear infinite",
        marginBottom: "15px",
    },
};

export default UserProfile;