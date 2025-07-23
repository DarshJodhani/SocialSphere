import { format, formatDistanceToNowStrict, isToday, isYesterday, differenceInSeconds, differenceInMinutes, differenceInHours } from 'date-fns';

export default function formatRelativeTime(date) {
  const now = new Date();
  const d = new Date(date);
  const seconds = differenceInSeconds(now, d);
  const minutes = differenceInMinutes(now, d);
  const hours = differenceInHours(now, d);

  if (seconds < 10) return 'Just now';
  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24 && isToday(d)) return `${hours} hours ago`;
  if (isYesterday(d)) return 'Yesterday';
  if (hours < 72) return `${Math.floor(hours / 24)} days ago`;
  return format(d, 'MMM d, yyyy');
}
