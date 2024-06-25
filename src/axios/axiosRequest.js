import axios from "axios";
// const BaseUrl = "http://103.138.196.123/mapi/";
const BaseUrl = "http://localhost:8881/api/admin/";

export const postRequest = async (url, body) => {
    try {
        let getData = await axios.post(BaseUrl + url, body);
        return getData.data;
    } catch (e) {
        return e;
    }
};
export const postRequestWithHeaders = async (url, body, headers) => {
    try {
        let getData = await axios.post(url, body, { headers: headers });
        return getData.data;
    } catch (e) {
        return e;
    }
};

export const getRequest = async (url, body) => {
    try {
        let getData = await axios.get(BaseUrl + url, body);
        return getData.data;
    } catch (e) {
        return e;
    }
};
export const downloadRequest = async (url, data) => {
    const headers = { "Content-Type": "blob" };
    const config = {
        method: "POST",
        data,
        url: BaseUrl + url,
        responseType: "arraybuffer",
        headers,
    };

    try {
        const response = await axios(config);

        const outputFilename = `${Date.now()}.xlsx`;

        // If you want to download file automatically using link attribute.
        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", outputFilename);
        document.body.appendChild(link);
        link.click();

        // OR you can save/write file locally.
        // fstat.writeFileSync(outputFilename, response.data);
    } catch (error) {
        throw Error(error);
    }
};

