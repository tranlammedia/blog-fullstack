export function formateDate(dateString: string): string {
    // convert  '2024-01-22T08:14:32.852Z' to '22-01-2024'
    const inputDate = new Date(dateString);

    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
    const year = inputDate.getFullYear();

    return `${day}-${month}-${year}`;
}

export const decodeJwt = (token?: string | null) => {
    let tokenEncode: string | null = token || null;
    if (!token) {
        tokenEncode = localStorage.getItem("token");
    }
    if (tokenEncode) {
        const [header, payload, signature] = tokenEncode.split(".");
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload;
    }

    return null;
};

export const htmltostring = (html: string, len: number = 300): string => {
    const stringHtml = html.substring(0, len + 50);
    const stringWithoutHtml = stringHtml.replace(/<[^>]+>/g, "");

    const regex = /[.?!]/gi
    const subString = stringWithoutHtml.substring(0, len);

    let lastPosition = -1;
    let match;

    while ((match = regex.exec(subString)) !== null) {
        lastPosition = match.index;
    }

    const result =
        lastPosition !== -1
            ? stringWithoutHtml.substring(0, lastPosition + 1)
            : stringWithoutHtml.substring(0, 200) + (stringWithoutHtml.length > 200 ? "..." : "");

    return result;
};
