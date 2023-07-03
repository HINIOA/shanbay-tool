import type { PlasmoMessaging } from "@plasmohq/messaging";
import { getUserInfo } from "~api";

const handler: PlasmoMessaging.MessageHandler = async (_, res) => {
  const response = await getUserInfo();

  res.send(response);
};

export default handler;
