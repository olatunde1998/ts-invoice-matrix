import axios from "axios";

// GET(READ) ALL INVOICES REQUEST
export const GetInvoicesRequest = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/invoices`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
    },
  });
  const data = await response.data;
  return data;
};

// GET INVOICE BY ID REQUEST
export const GetInvoiceByIdRequest = async (invoiceID :any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/invoices/${invoiceID}`,
    {
      maxBodyLength: Infinity,
      headers: {
        Accept: "application/vnd.connect.v1+json",
      },
    }
  );
  const data = await response.data;
  return data;
};

// CREATE NEW INVOICE REQUEST
export const CreateInvoiceRequest = async (body: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/invoices`, body, {
      headers: {
        Accept: "application/vnd.connect.v1+json",
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(data, "data is here");
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// EDIT INVOICE REQUEST
export const EditInvoiceRequest = async (editInvoiceID: any, body: any) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/invoices/${editInvoiceID}`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    console.log(data);
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE INVOICE  REQUEST
export const DeleteInvoiceRequest = async (deleteInvoiceID: any) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/invoices/${deleteInvoiceID}`,
    {
      maxBodyLength: Infinity,
      headers: {
        Accept: "application/vnd.connect.v1+json",
      },
    }
  );
  const data = await response.data;
  return data;
};






