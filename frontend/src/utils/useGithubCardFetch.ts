import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";
import _ from "lodash";

export default function useGithubCardFetch(link: string) {
  const [githubFiles, setGithubFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, [githubFiles]);

  useEffect(() => {
    setLoading(true);
    const parsedLink = new URL(
      link.startsWith("https://") ? link : `https://${link}`
    );

    switch (parsedLink.hostname) {
      case "github.com":
        const splitLink = parsedLink.pathname
          .split("/")
          .filter((s) => s !== "");
        if (splitLink.length < 2) {
          throw "Invalid github link";
        }

        const username = splitLink[0];
        const repo = splitLink[1];
        const remainder = splitLink.slice(2, splitLink.length).join("/");

        getCardsFromGithubMemo(
          username,
          repo,
          remainder === "" ? undefined : "/" + remainder
        )
          .then((files) => {
            setGithubFiles(files);
            setError(null);
          })
          .catch((reason) => {
            setError(reason);
          });
      default:
        setGithubFiles([]);
        setError("Link not readable");
    }
  }, [link, setGithubFiles]);

  return { githubFiles, error, loading };
}

const CARD_SUFFIX = "card.json";
const octokit = new Octokit();

interface File {
  name: string;
  path: string;
  download_url: string;
}

export const getCardsFromGithubMemo = _.memoize(getCardsFromGithub);

export async function getCardsFromGithub(
  owner: string,
  repo: string,
  remainingPath?: string
): Promise<File[]> {
  console.log("Called");
  const content = await octokit.repos.getContent({
    owner,
    repo,
    path: remainingPath || "",
  });

  if (Array.isArray(content.data)) {
    const data: any = content.data;
    const castedData: File[] = data;

    const cards = castedData
      .map(({ name, path, download_url }) => ({ name, path, download_url })) // extract fields
      .filter(({ name }) => name.endsWith(CARD_SUFFIX));
    return cards;
  } else {
    return [
      {
        name: content.data.name,
        path: content.data.path,
        download_url: content.data.download_url,
      },
    ];
  }
}
