import type { MetaFunction } from "@remix-run/node";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import json2ts from "json-to-ts";
import { useState } from "react";
import toast from "react-hot-toast";

export const meta: MetaFunction = () => {
  return [
    { title: "JSON to TS" },
    {
      name: "description",
      content: "Convert json object to typescript interfaces",
    },
  ];
};

export default function Index() {
  const [source, setSource] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onConvert = async () => {
    if (!source) return;
    try {
      const parsed = parseJSON(source);
      const text = json2ts(parsed, { rootName: "DataProps" }).reduce(
        (a, b) => `${a}\n\n${b}`
      );
      setResult(text);
    } catch (e) {
      toast.error("Data format is not correct");
    }
  };

  const onClear = () => {
    setSource("");
    setResult("");
  };

  const parseJSON = (json: string) => {
    try {
      return JSON.parse(json);
    } catch {
      throw new Error("输入数据格式不正确");
    }
  };

  return (
    <section className="min-h-screen max-w-screen-xl flex m-auto">
      <div className="w-full m-auto">
        <header className="text-center space-y-4 mb-10">
          <h1 className="text-4xl font-bold">JSON to TS</h1>
          <p>Convert json object to typescript interfaces</p>
        </header>
        <main className="mt-4 space-y-4">
          <div className="flex space-x-4 items-stretch h-200">
            <div className="flex-1 space-x-4">
              <Textarea
                minRows={20}
                maxRows={40}
                placeholder="Paste JSON here"
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                }}
              />
            </div>
            <div className="space-y-4 flex flex-col">
              <Button color="primary" onClick={onConvert}>
                Convert
              </Button>
              <Button color="danger" onClick={onClear}>
                Clear
              </Button>
            </div>
            <div className="flex-1">
              <Textarea
                minRows={20}
                maxRows={40}
                placeholder="Typescript interfaces will appear here"
                value={result}
                onChange={(e) => {
                  setSource(e.target.value);
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
