export type Player = {
  userId: string;
  username: string;
  status: string;
  description: string;
  avatarUrl?: string;
  playedGames: number;
  rating: number;
  accountCreated: string;
  friendsIds: string[];
  followersIds: string[];
};

export type UpdateUserInfoPayload = {
  status: string;
  description: string;
};

export type UploadAvatarResponse = {
  filePath: string;
};
