"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InlineWidget } from "react-calendly";

const Dashboard = () => {
    // question data
    const Question = [{
        list: {
            data: [
                {
                    title: "What is the capital of India?",
                    options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
                }
            ]
        }
    }];
    // use router
    const router = useRouter();

    // remove value fuction
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [router]);
    function remove() {
        localStorage.removeItem("isAuthenticated");
        router.push("/");
    }
    
    // usestate
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
    const [images, setImages] = useState<string[]>([]);
    // useeffect
        
    useEffect(() => {
        return () => {
            images.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));
        };
    }, [images]);
    // handle image upload fuction
    const handleImageUpload = (event : any ) => {
        // if event target files
        if (event.target.files) {
            // uploaded images
            const uploadedImages = Array.from(event.target.files).map((file) =>
                // create object url
                URL.createObjectURL(file as any)
            );
            // set multiple images
            setImages((prevImages) => [...prevImages, ...uploadedImages]);
        }
    };

    return (
        <>
            <div className="flex max-md:flex-col items-center justify-center gap-10 my-6">
                {/* add logout button */}
                <button
                    onClick={() => remove()}
                    className="border border-black rounded-xl px-2 py-1"
                >
                    log out
                </button>
                {/* question buttons from map */}
                {["Question 1", "Question 2", "Question 3"].map((label, index) => (
                    <button
                        key={index}
                        className={`px-7 py-3 rounded-xl font-medium text-white ${activeQuestion === index + 1
                            ? "bg-green-600"
                            : "bg-purple-700 hover:bg-purple-600"
                            }`}
                        onClick={() => setActiveQuestion(index + 1)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {/* question 1 answer */}
            {activeQuestion === 1 && (
                <div>
                    <p>{Question[0].list.data[0].title} {Question[0].list.data[0].options[0]}</p>
                </div>
            )}
            {/* question 2 answer */}
            {activeQuestion === 2 && (
                <div>
                    <InlineWidget
                        url="https://calendly.com/vj13798/30min"
                        styles={{ height: "600px" }}
                    />
                </div>
            )}
            {/* question 3 answer */}
            {activeQuestion === 3 && (
                <div>
                    <input type="file" multiple onChange={handleImageUpload} />
                    <div className="flex flex-wrap mt-4 gap-4">
                        {images.map((imageUrl, index) => (
                            <div key={index} className="relative w-[200px] h-[200px]">
                                <img
                                    src={imageUrl}
                                    alt={`upload-${index}`}
                                    className="object-cover w-full h-full rounded-lg shadow-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};


export default Dashboard;
