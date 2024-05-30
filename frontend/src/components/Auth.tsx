import { SignUpObject } from "@arnavjain/common-resources";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignUpObject>({
        name: "",
        email: "",
        password: "",
    });

    async function sendRequest() {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${
                    type === "signup" ? "signup" : "signin"
                }`,
                postInputs
            );
            const jwt = response.data.jwt;
            console.log(jwt);
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="text-slate-500">
                            {type === "signin"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                            <Link
                                className="pl-2 underline"
                                to={type === "signin" ? "/signup" : "/signin"}
                            >
                                {type === "signin" ? "Sign up" : "Login"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-4">
                        {type === "signup" ? (
                            <LabelledInput
                                label="Name"
                                placeholder="John Doe"
                                onChange={(e) => {
                                    setPostInputs((c) => ({
                                        ...c,
                                        name: e.target.value,
                                    }));
                                }}
                            />
                        ) : null}
                        <LabelledInput
                            label="Email"
                            type="email"
                            placeholder="abc@gmail.com"
                            onChange={(e) => {
                                setPostInputs((c) => ({
                                    ...c,
                                    email: e.target.value,
                                }));
                            }}
                        />
                        <LabelledInput
                            label="Password"
                            type="password"
                            placeholder="password"
                            onChange={(e) => {
                                setPostInputs((c) => ({
                                    ...c,
                                    password: e.target.value,
                                }));
                            }}
                        />
                        <button
                            onClick={sendRequest}
                            type="button"
                            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-8"
                        >
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputProps {
    label: string;
    type?: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function LabelledInput({
    label,
    type,
    placeholder,
    onChange,
}: LabelledInputProps) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-black pt-4">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                id=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
