const WAITLIST_EMAILS = new Set([
  "vcrespo.033@gmail.com",
  "castella.louis1@gmail.com",
  "castellapaul@outlook.com",
  "hugofabregues@gmail.com",
  "sataherizo65@gmail.com",
  "michaelrandriantsivelany@gmail.com",
  "juliendu09.lyon@hotmail.com",
  "youngtrader269@gmail.com",
  "jawspacheco@gmail.com",
  "chloeherault9@gmail.com",
  "mailys.chassin@icloud.com",
  "peressasha92@gmail.com",
  "anlamoudine.cheikh@gmail.com",
  "margueray.marius@gmail.com",
  "jpratlong29@gmail.com",
  "alamcheikh656@gmail.com",
]);

export function isOnWaitlist(email: string): boolean {
  return WAITLIST_EMAILS.has(email.trim().toLowerCase());
}
