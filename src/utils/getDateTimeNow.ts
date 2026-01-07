import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function getDateTimeNow() {
    return dayjs().utcOffset(8).format("YYYY-MM-DD HH:mm:ss");
}