export function formateDate(dateString:string): string {
    // convert  '2024-01-22T08:14:32.852Z' to '22-01-2024'
    const inputDate = new Date(dateString);

    const day = String(inputDate.getDate()).padStart(2, '0');
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
    const year = inputDate.getFullYear();

    return `${day}-${month}-${year}`;
}