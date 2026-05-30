"use client";

import {
  useEffect,
  useState,
} from "react";

type Props = {
  question: string;
};

type FeedbackType = {
  score: string;
  technical: string;
  communication: string;
  improvement: string;
};

export default function VoiceControls({
  question,
}: Props) {

  const [isListening,
    setIsListening] =
    useState(false);

  const [transcript,
    setTranscript] =
    useState("");

  const [loadingFeedback,
    setLoadingFeedback] =
    useState(false);

  const [feedback,
    setFeedback] =
    useState<FeedbackType | null>(
      null
    );

  // TEXT TO SPEECH
  const speakQuestion = () => {

    if (!question) return;

    const speech =
      new SpeechSynthesisUtterance(
        question
      );

    speech.lang = "en-US";

    speech.rate = 1;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
      speech
    );
  };

  // SPEECH TO TEXT
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition not supported"
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.start();

    setIsListening(true);

    recognition.onresult = (
      event: any
    ) => {

      const text =
        event.results[0][0]
          .transcript;

      setTranscript(text);

      setIsListening(false);
    };

    recognition.onerror = () => {

      setIsListening(false);
    };

    recognition.onend = () => {

      setIsListening(false);
    };
  };

  // GENERATE FEEDBACK
  const generateFeedback =
    async () => {

      if (!transcript) return;

      try {

        setLoadingFeedback(true);

        const response =
          await fetch(
            "/api/feedback",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                question,
                userAnswer:
                  transcript,
              }),
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setFeedback(
            data.feedback
          );
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoadingFeedback(false);
      }
    };

  // AUTO SPEAK
  useEffect(() => {

    if (question) {

      speakQuestion();

      setTranscript("");

      setFeedback(null);
    }

  }, [question]);

  return (
    <div className="mt-6 space-y-5">

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-3">

        <button
          onClick={speakQuestion}
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          🔊 Read Question
        </button>

        <button
          onClick={startListening}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white"
        >
          {isListening
            ? "Listening..."
            : "🎤 Start Speaking"}
        </button>

        <button
          onClick={
            generateFeedback
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          {loadingFeedback
            ? "Analyzing..."
            : "🤖 Analyze Answer"}
        </button>

      </div>

      {/* TRANSCRIPT */}
      <div className="rounded-2xl bg-gray-100 p-5">

        <h3 className="text-lg font-semibold">

          Your Spoken Answer

        </h3>

        <p className="mt-3 leading-7 text-gray-700">

          {transcript ||
            "Your voice answer will appear here..."}

        </p>

      </div>

      {/* FEEDBACK */}
      {feedback && (

        <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <h3 className="text-2xl font-bold">

              AI Feedback

            </h3>

            <div className="rounded-full bg-black px-4 py-2 text-white">

              {feedback.score}

            </div>

          </div>

          <div className="space-y-4">

            <div>

              <h4 className="font-semibold">

                Technical Accuracy

              </h4>

              <p className="text-gray-700">

                {feedback.technical}

              </p>

            </div>

            <div>

              <h4 className="font-semibold">

                Communication

              </h4>

              <p className="text-gray-700">

                {feedback.communication}

              </p>

            </div>

            <div>

              <h4 className="font-semibold">

                Improvement Tips

              </h4>

              <p className="text-gray-700">

                {feedback.improvement}

              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}