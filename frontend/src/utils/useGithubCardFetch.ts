import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";
import _ from "lodash";

export default function useGithubCardFetch(link: string) {
  const [githubFiles, setGithubFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    setError(null);
  }, [githubFiles]);

  useEffect(() => {
    setLoading(true);

    if (!link || link === "" || link === "/") {
      setLoading(false);
      return;
    }
    const parsedLink = new URL(
      link.startsWith("https://") ? link : `https://${link}`
    );

    switch (parsedLink.hostname) {
      case "github.com":
        const splitLink = parsedLink.pathname
          .split("/")
          .filter((s) => s !== "");
        if (splitLink.length < 2) {
          setError("Invalid github link");
          return;
        }

        const username = splitLink[0];
        const repo = splitLink[1];
        const remainder = splitLink.slice(2, splitLink.length).join("/");

        getCardsFromGithub(
          username,
          repo,
          remainder === "" ? undefined : "/" + remainder
        )
          .then((files) => {
            setLoading(false);
            setGithubFiles(files);
            setError(null);
          })
          .catch((reason) => {
            setLoading(false);
            setGithubFiles([]);
            setError(JSON.stringify(reason));
          });
        break;
      default:
        setLoading(false);
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

var memo: Record<string, File[]> = {};
export async function getCardsFromGithub(
  owner: string,
  repo: string,
  remainingPath?: string
): Promise<File[]> {
  if (`${owner}/${repo}${remainingPath}` in memo) {
    return memo[`${owner}/${repo}${remainingPath}`];
  }
  const content = await octokit.repos.getContent({
    owner,
    repo,
    path: decodeURI(remainingPath || ""),
  });

  if (Array.isArray(content.data)) {
    const data: any = content.data;
    const castedData: File[] = data;

    const cards = castedData
      .map(({ name, path, download_url }) => ({ name, path, download_url })) // extract fields
      .filter(({ name }) => name.endsWith(CARD_SUFFIX));
    memo[`${owner}/${repo}${remainingPath}`] = cards;
    return cards;
  } else {
    const cards = [
      {
        name: content.data.name,
        path: content.data.path,
        download_url: content.data.download_url,
      },
    ];
    memo[`${owner}/${repo}${remainingPath}`] = cards;
    return cards;
  }
}
