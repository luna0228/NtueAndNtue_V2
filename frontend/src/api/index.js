import axios from "axios";
// yarn add axios
// 用axios js 接json api資料 
// const url =
//    "https://script.google.com/macros/s/AKfycbzUvJmNkD6ho5dgCKL5gTLE9pcZc8wXhuxsAE5Uy17OxOBSxoZuPDC2tgdcShzRFr1g7w/exec";

const url =
   "http://localhost:5001/worklist";

export const getWorksList = async () => {
   try {
      const response = await axios.get(url);
      console.log('response in api', response.data)
      return response.data;
   } catch (err) {
      console.log(err);
   }

}

//for WorksList，使用時代入school, semester
export const getWorksListBySchoolSemester = async (school, semester) => {
   try {
      const response = await axios.get(`${url}/${school}/${semester}`);
      //使用api：http://localhost:5001/worklist/{school}/{semester}
      return response.data;
   } catch (err) {
      console.log(err);
   }
}

//for skill search，使用時代入skill_filter
export const filterWorksListBySkill = async (skill_filter) => {
   try {
      const response = await axios.get(`${url}/skill_filter?skill_filter=${skill_filter}`);
      //使用api：http://localhost:5001/worklist/skill_filter
      return response.data;
   } catch (err) {
      console.log(err);
   }
}

//for 點擊數
export const updateClkCnt = async (id) => {
   try {
      const response = await axios.put(`${url}/update/clkcnt/${id}`);
      return response.data;
   } catch (err) {
      console.log(err);
   }
}