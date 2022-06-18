import useSWR from "swr";


export default function useSummary() {
  return useSWR('/api/summary')
}
