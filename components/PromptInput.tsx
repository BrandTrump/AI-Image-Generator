"use client";
import useSWR from "swr";
import { useState } from "react";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";

function PromptInput() {
  const [input, setInput] = useState("");

  const { data: suggestion, isLoading } = useSWR(
    "/api/suggestion",
    fetchSuggestionFromChatGPT,
    {
      revalidateOnFocus: false,
    }
  );
  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 outline-none rounded-md"
          placeholder="Enter a prompt..."
        />
        <button
          type="submit"
          disabled={!input}
          className={`p-4 ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          } `}
        >
          Generate
        </button>
        <button
          type="button"
          className="bg-violet-400 p-4 text-white transition-colors duration-200  disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="bg-white p-4 text-violet-400 transition-colors duration-200  rounded-b-md md:rounded-r-md md:rounded-bl-none "
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
}

export default PromptInput;
