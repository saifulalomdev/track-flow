export const formatSlug = (text: string): string => {
  return text
    .trim()              
    .toLowerCase()           
    .replace(/\s+/g, '-')   
    .replace(/-+/g, '-');    
};