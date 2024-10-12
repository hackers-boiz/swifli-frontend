/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { MintButton } from "./MintButton";

type BlinkConfig = {
  name: string;
  description: string;
  image: string;
  website: string;
  actions: Array<{
    id: string;
    label: string;
  }>;
};

export const Card = ({ id }: { id: string }) => {
  const [blinkData, setBlinkData] = useState<BlinkConfig | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${id}`, {
        method: 'GET',
        headers: {
          "ngrok-skip-browser-warning": "69420"
        }
      });

      const data = await res.json();
      setBlinkData(data);
    };

    fetchData();
  }, []);

  return <div
    className="flex flex-col gap-4 border-2 border-teal-500 p-6 rounded-2xl w-full"
  >
    <img src={blinkData?.image} alt="McDonald" className="rounded-xl h-auto w-full" />
    {blinkData?.website && <a
      href={blinkData?.website}
      target="_blank"
      className="text-xs font-mono text-gray-200" rel="noreferrer"
    >{new URL(blinkData?.website).hostname}</a>}

    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-white">{blinkData?.name}</h1>
      <p className="text-sm text-gray-200">{blinkData?.description}</p>
    </div>

    <div className="flex gap-1 w-full">
      {
        blinkData?.actions.map((action, index) => (
          <MintButton
            key={index}
            id="123"
            name={action.label}
          />
        ))
      }
    </div>
  </div>;
};
