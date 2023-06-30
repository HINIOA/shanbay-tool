import type { PlasmoMessaging } from "@plasmohq/messaging";
import { check, translate } from "~api";
import type { WordInfo } from "~contents/Modal";


const handler: PlasmoMessaging.MessageHandler<
  { word: string },
  WordInfo
> = async (req, res) => {
  const translateRes = await translate(req.body.word);
  const checkRes = await check(translateRes.id);

  res.send({ ...translateRes, exists: checkRes.objects[0].exists });
};

export default handler;