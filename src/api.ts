export function bayFetch(
  url: string,
  config?: RequestInit,
  body?: Record<any, any>
) {
  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...config,
  }).then((res) => res.json());
}

/** 获取用户信息 */
export const getUserInfo = () =>
  bayFetch("https://apiv3.shanbay.com/bayuser/user");

/** 添加单词到生词本 */
export const collect = (wordId: string) =>
  bayFetch(
    "https://apiv3.shanbay.com/wordscollection/words",
    {
      method: "POST",
    },
    {
      business_id: 0,
      vocab_id: wordId,
    }
  );

interface CheckRes {
  objects: {
    exists: boolean;
    vocab_id: string;
  }[];
}

/** 查看单词是否已存入生词本 */
export const check = (vocab_id: string): Promise<CheckRes> =>
  bayFetch(
    `https://apiv3.shanbay.com/wordscollection/words_check?vocab_ids=${vocab_id}`
  );

export interface TranslateRes {
  audios: Audio[];
  content: string;
  definitions: Definitions;
  id: string;
  id_int: string;
  ref_id: string;
  vocab_type: string;
  labels: any[];
}

export interface Audio {
  sense_id: any;
  uk: Uk;
  us: Us;
}

export interface Uk {
  ipa: string;
  name: string;
  urls: string[];
}

export interface Us {
  ipa: string;
  name: string;
  urls: string[];
}

export interface Definitions {
  cn: Cn[];
  en: any[];
}

export interface Cn {
  def: string;
  dict_id: string;
  pos: string;
  sense_id: string;
}

/** 获取单词详情 */
export const translate = (word: string): Promise<TranslateRes> =>
  bayFetch(
    `https://apiv3.shanbay.com/abc/words/senses?vocabulary_content=${word}`
  );
