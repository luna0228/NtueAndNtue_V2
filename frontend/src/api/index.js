import axios from "axios";
// yarn add axios
// 用axios js 接json api資料 
const url =
   "https://script.google.com/macros/s/AKfycbzUvJmNkD6ho5dgCKL5gTLE9pcZc8wXhuxsAE5Uy17OxOBSxoZuPDC2tgdcShzRFr1g7w/exec";

export const getWorksList = async () => {
   try {
      const response = await axios.get(url);
      console.log('response in api', response.data)
      return response.data;
   } catch (err) {
      console.log(err);
   }

}