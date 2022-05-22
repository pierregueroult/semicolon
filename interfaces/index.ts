export type HeaderTypes = {
  account: boolean;
  accountDetails: {
    id: number;
    username: string;
    email: string,
    pictureUrl: string;
  } | null;
  setSearchValue: Function;
};

export type Pages = {
  href: string;
  name: string;
  Icon?: JSX.Element;
}[];

export type PageTypes = {
  searchValue: string;
  account: boolean;
  setAccount: Function;
  sessionUuid: string;
  setSessionUuid: Function;
};

export type ChangeHeadTypes = {
  pages: Pages;
};

export type ErrorTypes = {
  statusCode?: number;
};

export type PostTypes = {
  id: number;
  title: string;
  content: string;
  likes: number;
  shares: number;
  account?: boolean;
};

export type PostsTypes = Array<PostTypes>;

export type VideoTypes = {
  id: number;
  link: string;
  classNumber?: number;
};

export type VideosTypes = Array<VideoTypes>;
