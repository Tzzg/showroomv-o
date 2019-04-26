import md5 from './js-md5'
function getCurrentTimeStamp() {
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    return timestamp;
}

// remainder is 0 - even number
// remainder is 1 - odd number
function getPartStr(remainder, str){
    let strArr = str.split("");
    let resArr = [];
    let resStr = '';

    for (let i=0; i<strArr.length; i++) {
        if (i % 2 == remainder) {
            resArr.push(strArr[i]);
        }
    }

    resStr = resArr.join('');

    return resStr;
}

   /**
   *
   * 1 u_id 与 TimeStamp 做  ->  位或运算
   2    ->  md5  16位大
   3    ->  取奇数位
   4    ->  拼接约定好的 key
   5    ->  md5  32位大
   6    ->  取偶数位
   7    ->  最终token
   */
//   static function get_encryption_token($uid,$time){
 
//     $key = 'rM8sKhZ%Q*wcrf@1';
//     $tem= $uid | $time;
//     $tem = strtoupper(md5($tem));
//     $tem=substr($tem,8,16);
 
//     $tem = self::str_get_parity(0, $tem);
 
//     $tem = $tem.$key;
//     $tem = strtoupper(md5($tem));
//     $tem = self::str_get_parity(1, $tem);
//     return  $tem;
//   }

  function getSignToken (uid, time) {
      const key = 'rM8sKhZ%Q*wcrf@1';
      let result;

      let uidOrTime = uid|time;
      let uidOrTimeMd5 = md5(uidOrTime);

      result = uidOrTimeMd5.toUpperCase().substr(8, 16);
      result = getPartStr(0, result);

      result = md5(result + key).toUpperCase();
      result = getPartStr(1, result);

      return result;
  }

  function uploadSingleFile(url, filePath, name, formData, cb) {
    console.log('a=' + filePath)

    console.log('avatar url: ', url)

    const userInfo = wx.getStorageSync('user_token')
    const token = userInfo.access_token

    wx.uploadFile({
      url: url.url,
      method: url.method,
      filePath: filePath,
      name: name,
      header: {
        'content-type': 'multipart/form-data',
        'Access-Token': token
      }, // 设置请求的 header
      formData: formData, // HTTP 请求中其他额外的 form data
      success: function (res) {
          console.log('avatar result', res)
        if (res.statusCode == 200 && !res.data.code) {
          return typeof cb == "function" && cb(res.data)
        } else {
          return typeof cb == "function" && cb(false)
        }
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      }
    })
  }

module.exports = {
    getCurrentTimeStamp,
    getPartStr,
    getSignToken,
    uploadSingleFile
}