import axios from "axios";
import { api } from "@/config";
import { TOKEN } from "@/store/mutation-types";
import storage from "@/utils/storage";

// 上传文件
// eslint-disable-next-line import/prefer-default-export
export function uploadFile(data) {
  return new Promise((resolve, reject) => {
    const toke = storage.getItem(TOKEN);
    axios(`${api.baseUrl}api/v1/customer/chat/fileUpload`, {
      method: "post",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        token: toke
      }
    })
      .then(res => {
        console.log("res", res.data);
        if (!res.data) {
          reject(new Error("上传失败"));
          return;
        }
        if (res.data.respCode === 0) {
          resolve(res.data.respData);
        } else {
          reject(new Error(res.data.msg));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
