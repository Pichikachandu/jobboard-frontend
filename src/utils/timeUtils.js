/**
 * Formats a date to a relative time string (e.g., "2 hours ago", "Yesterday", "May 23")
 * @param {string|Date} date - The date to format (ISO string or Date object)
 * @returns {string} Formatted relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return 'Just now';
  
  const now = new Date();
  const postDate = new Date(date);
  
  // If the date is invalid, return a fallback
  if (isNaN(postDate.getTime())) return 'Just now';
  
  const diffInSeconds = Math.floor((now - postDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  // Less than 1 minute
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  // Less than 1 hour
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }
  
  // Less than 24 hours
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }
  
  // Less than 48 hours (yesterday)
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  
  // More than 2 days, show the date
  return postDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Checks if a job is a default job (not user-created)
 * @param {Object} job - The job object
 * @returns {boolean} True if it's a default job
 */
export const isDefaultJob = (job) => {
  return job.isDefault === true || !job.createdAt;
};
