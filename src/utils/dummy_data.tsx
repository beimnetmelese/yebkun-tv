export interface UserInfo {
  name: string;
  country: string;
  city1: string;
  city2: string;
  flag1: string;
  flag2: string;
  memeber_since: string;
  id: string;
  status: string;
  userImage: string;
}

export const userInfo: UserInfo = {
  name: "User Name",
  country: "Rojava",
  city1: "Qamishlo",
  city2: "Hannover",
  flag1: "/userinfo/flag1.png",
  flag2: "/userinfo/flag2.png",
  memeber_since: "12.10.2024 - 17:15",
  id: "12*****",
  status: "Educated",
  userImage: "/userinfo/user_image.png",
};
