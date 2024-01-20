import axios from "axios";

const NASA_API_KEY =
  process.env.NASA_API_KEY ?? "kc3akuxHnCzDDglHqF1jItFWxjLtbCak447c4FHL";
const BASE_API_URL = process.env?.NASA_API_URL ?? "https://api.nasa.gov";
const axiosClient = axios.create({ baseURL: BASE_API_URL, timeout: 1000 });

export async function getPodNasa({ startDate = "", endDate = "" }) {
  const params = { api_key: NASA_API_KEY };

  if (startDate && endDate) {
    params.start_date = startDate;
    params.end_date = endDate;
  } else if ((startDate && !endDate) || (!startDate && endDate)) {
    params.date = startDate ?? endDate;
  }

  return await axiosClient.get("/planetary/apod", { params });
}
