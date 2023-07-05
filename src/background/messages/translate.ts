import type { PlasmoMessaging } from "@plasmohq/messaging";
import { check, translate, type TranslateRes } from "~api";


export interface WordInfo extends TranslateRes {
  exists?: boolean;
}

const handler: PlasmoMessaging.MessageHandler<
  { word: string },
  WordInfo
> = async (req, res) => {
  const translateRes = await translate(req.body.word);
  const checkRes = await check(translateRes.id);

  res.send({ ...translateRes, exists: checkRes.objects[0].exists });
};

export default handler;