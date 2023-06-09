"use client";
import useSWR from "swr";
import { FormEvent, useState } from "react";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import fetchImages from "@/lib/fetchImages";
import toast from "react-hot-toast";

function PromptInput() {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const { mutate: updateImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    // p is the prompt to send to API
    const p = useSuggestion ? suggestion : inputPrompt;

    const notificationPrompt = p;
    const notificationPromptShort = notificationPrompt.slice(0, 20);

    const notificaiton = toast.loading(
      `DALL E is creating: ${notificationPromptShort}...`
    );

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: p }),
    });

    const data = await res.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(`Your AI Art has been Generated!`, { id: notificaiton });
    }

    updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  const loading = isLoading || isValidating;
  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
        onSubmit={handleSubmit}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 outline-none rounded-md"
          placeholder={
            (loading && "ChatGPT is thinking of a suggestion...") ||
            suggestion ||
            "Enter a prompt..."
          }
        />
        <button
          type="submit"
          disabled={!input}
          className={`p-4 ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200 hover:bg-violet-600"
              : "text-gray-300 cursor-not-allowed"
          } `}
        >
          Generate
        </button>
        <button
          type="button"
          onClick={() => submitPrompt(true)}
          className="bg-violet-400 p-4 text-white transition-colors duration-200  disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-violet-500"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="bg-white p-4 text-violet-400 transition-colors duration-200  rounded-b-md md:rounded-r-md md:rounded-bl-none hover:bg-gray-100"
          onClick={mutate}
        >
          New Suggestion
        </button>
      </form>

      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet=500">
            {loading ? "ChatGPT is thinking..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;
