import type { PlasmoMessaging } from "@plasmohq/messaging";
import { collect } from "~api";

const handler: PlasmoMessaging.MessageHandler<{ wordId: string }> = async (
  req,
  res
) => {
  const response = await collect(req.body.wordId);

  res.send(response);
};

export default handler;
