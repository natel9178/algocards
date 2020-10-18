import { Octokit } from "@octokit/rest";

export const errNoContent = "Could not find card";
const CARD_SUFFIX = "card.json";
const octokit = new Octokit();

interface File {
  name: string;
  path: string;
  download_url: string;
}

export async function getCardsFromGithub(
  owner: string,
  repo: string,
  remainingPath?: string
): Promise<File[]> {
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
