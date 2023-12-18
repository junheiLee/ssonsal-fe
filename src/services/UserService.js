import axios from "axios";


export const getCookie = (key) => {
    var result = null;
    var cookie = document.cookie.split(";");

    cookie.some((item) => {
      item = item.replace(" ", "");

      var dic = item.split("=");

      if (key === dic[0]) {
        result = dic[1];
        return true;
      };
    });

    return result;
}

export const doLogOut = async (token) => {


    try {
        const response = await axios.post("/user/logout", null, {
            headers: {
                ssonToken: getCookie("token")
            }
        });

        if(response.data.code === "SUCCESS") {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } else{
            alert(response.data.message);
        }

    } catch(error) {
        console.error(error);
    }

}
