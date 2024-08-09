import { format } from 'date-fns';


  // FUNCTION TO GET RANDOM EMAIL
export function getRandomEmail(firstName: string, lastName: string) {
    const domains = ['example.com', 'mail.com', 'test.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  }
  

  // FUNCTION TO FORMAT DATE
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};