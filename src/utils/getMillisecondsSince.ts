export const getMillisecondsSince = (dateString: string): number => {
  const now = new Date();
  const targetDate = new Date(dateString);
  return now.getTime() - targetDate.getTime();
};
