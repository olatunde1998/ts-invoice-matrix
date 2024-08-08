import { formatDate, getRandomEmail } from "./utils";

export const invoicesData = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: getRandomEmail('John', 'Doe'),
      date: formatDate('2023-08-01'),
      amount: 1500.00,
      paymentStatus: 'Paid',
      files: ['file1.pdf', 'file2.jpg']
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: getRandomEmail('Jane', 'Smith'),
      date: formatDate('2023-08-02'),
      amount: 2500.00,
      paymentStatus: 'Pending',
      files: ['file3.pdf']
    },
    {
      id: '3',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: getRandomEmail('Alice', 'Johnson'),
      date: formatDate('2023-08-03'),
      amount: 3500.00,
      paymentStatus: 'Overdue',
      files: ['file4.pdf', 'file5.png']
    },
    {
      id: '4',
      firstName: 'Bob',
      lastName: 'Brown',
      email: getRandomEmail('Bob', 'Brown'),
      date: formatDate('2023-08-04'),
      amount: 4500.00,
      paymentStatus: 'Paid',
      files: ['file6.pdf']
    },
    {
      id: '5',
      firstName: 'Charlie',
      lastName: 'Davis',
      email: getRandomEmail('Charlie', 'Davis'),
      date: formatDate('2023-08-05'),
      amount: 5500.00,
      paymentStatus: 'Pending',
      files: []
    },
    {
      id: '6',
      firstName: 'Diana',
      lastName: 'Miller',
      email: getRandomEmail('Diana', 'Miller'),
      date: formatDate('2023-09-06'),
      amount: 2000.00,
      paymentStatus: 'Paid',
      files: ['file7.pdf']
    },
    {
      id: '7',
      firstName: 'Ethan',
      lastName: 'Wilson',
      email: getRandomEmail('Ethan', 'Wilson'),
      date: formatDate('2023-08-07'),
      amount: 3000.00,
      paymentStatus: 'Overdue',
      files: ['file8.pdf', 'file9.jpg']
    },
    {
      id: '8',
      firstName: 'Fiona',
      lastName: 'Clark',
      email: getRandomEmail('Fiona', 'Clark'),
      date: formatDate('2023-08-08'),
      amount: 4000.00,
      paymentStatus: 'Pending',
      files: ['file10.pdf']
    },
    {
      id: '9',
      firstName: 'George',
      lastName: 'Lee',
      email: getRandomEmail('George', 'Lee'),
      date: formatDate('2023-08-09'),
      amount: 5000.00,
      paymentStatus: 'Paid',
      files: []
    },
    {
      id: '10',
      firstName: 'Hannah',
      lastName: 'Martin',
      email: getRandomEmail('Hannah', 'Martin'),
      date: formatDate('2023-08-10'),
      amount: 6000.00,
      paymentStatus: 'Overdue',
      files: ['file11.pdf', 'file12.png']
    }
  ];