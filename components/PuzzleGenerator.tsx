const dayCodes = [
  "1A","2B","3C","4D","5E","6F",
  "7G","8H","9I","10J","11K","12L",
  "13A","14B","15C","16D","17E","18F",
  "19G","20H","21I","22J","23K","24L",
  "25A","26B","27C","28D","29E","30F","31G",
] as const;

type DayCode = (typeof dayCodes)[number];

export function generatePuzzleCode(date: Date = new Date()): string | null {
  const day = date.getDate();            // 1–31
  const hour24 = date.getHours();  
  console.log('time',hour24)      // 0–23

  if (day !== hour24) {
    console.log("Day and hours do not match — puzzle locked.");
    return null;
  }

  const dayCode: DayCode = dayCodes[day - 1]; // e.g. "15C"

  const m60   = day * 24;       // day × 24hours = minutes
  const s3600 = m60 * 60;     // minutes × 60 = seconds

  const raw = `${dayCode}${m60}${s3600}`; 
  console.log('raw',raw)// e.g. 15C90054000
  const reversed = [...raw].reverse().join("");
  console.log('reversed',reversed) // "00045 009C51"

  return `0x${reversed.slice(0,2)}-${reversed.slice(2,4)}*${reversed.slice(4,8)}_${reversed.slice(8,11)}|${dayCode}`;
}


export function verifyManualCode(day: number, hour: number): string | null {
  if (day < 1 || day > 31 || hour < 0 || hour > 23) return null;
  if (day !== 15) return null;
  const code: DayCode = dayCodes[day - 1];
  const m60 = day * 24;
  const s3600 = m60 * 60;
  const raw = `${code}${m60}${s3600}`;
  const reversed = raw.split('').reverse().join('');
  return raw;
}
