import { useEffect, useState } from "react"

import "./styles.css"

import { getUserInfo } from "~api"

interface UserInfo {
  avatar_url: string
  nickname: string
  msg: string
}

function IndexPopup() {
  const [userInfo, setUserInfo] = useState<UserInfo>()

  useEffect(() => {
    getUserInfo().then(setUserInfo)
  })

  if (!userInfo) {
    return null
  }

  return (
    <main>
      {userInfo.msg === "登录信息过期" ? (
        <div>
          <div>你没有登录扇贝网，登录后可在任意网页右击查词。</div>
          <a href="https://web.shanbay.com/web/account/login" target="_blank">
            去扇贝网登录
          </a>
        </div>
      ) : (
        <div>
          <div className="intro">你已登陆扇贝网</div>
          <div className="user">
            <img src={userInfo.avatar_url} className="avatar" />
            <div className="meta">
              <div className="nickname">{userInfo.nickname}</div>
              <div className="tip">
                <ul>
                  <li>你可以在任意网页右击查词</li>
                  <li>
                    去你的扩展程序列表找到【详细信息】-{">"}
                    【扩展程序选项】可开启双击查词
                  </li>
                  <li>配置更新后刷新所在页面生效</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default IndexPopup
