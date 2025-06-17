export const tagColors = [
  { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', darkBg: 'dark:bg-blue-900', darkText: 'dark:text-blue-200' },
  { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', darkBg: 'dark:bg-green-900', darkText: 'dark:text-green-200' },
  { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200', darkBg: 'dark:bg-purple-900', darkText: 'dark:text-purple-200' },
  { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200', darkBg: 'dark:bg-pink-900', darkText: 'dark:text-pink-200' },
  { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', darkBg: 'dark:bg-yellow-900', darkText: 'dark:text-yellow-200' },
  { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200', darkBg: 'dark:bg-indigo-900', darkText: 'dark:text-indigo-200' },
  { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', darkBg: 'dark:bg-red-900', darkText: 'dark:text-red-200' },
  { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', darkBg: 'dark:bg-orange-900', darkText: 'dark:text-orange-200' },
];

export const getColorForTag = (tagName: string) => {
  const hash = tagName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return tagColors[Math.abs(hash) % tagColors.length];
}; 