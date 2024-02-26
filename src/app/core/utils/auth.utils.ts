
  //returns PreRequestAction.Logout when refresh token has expired or token doesn't exists
  //PreRequestAction.Refresh when access token has expired and refresh is needed

import { PreRequestAction } from "../enums/PreRequestAction";

  //PreRequestAction.None when no token has expired and no action is needed
  export const checkAccessAndRefreshTokenExpiration = (): PreRequestAction => {
    const token = localStorage.getItem("token");
    //access token expires
    const accessExpires: any = localStorage.getItem("expires_in");

    //refresh token expires
    const refreshExpires: any = localStorage.getItem("refresh_expires_in");

    if (!token) {
      return PreRequestAction.None;
    }

    const dateNow = Date.now();
    const accessTemp = accessExpires - dateNow;
    const refreshTemp = refreshExpires - dateNow;
    if (refreshTemp < 0) {
      return PreRequestAction.Logout;
    }
    if (accessTemp > 0) {
      return PreRequestAction.None;
    } else {
      return PreRequestAction.Refresh;
    }
  }