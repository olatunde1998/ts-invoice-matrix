import { format } from 'date-fns';



export function getRandomEmail(firstName: string, lastName: string) {
    const domains = ['example.com', 'mail.com', 'test.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  }
  
export function formatDate(dateString: any) {
    const date = new Date(dateString);
    return format(date, 'dd MMM, yyyy');
  }