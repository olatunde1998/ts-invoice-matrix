import axios from "axios";

// GET(READ) ALL CLIENTS REQUEST
export const GetClientsRequest = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/clients`, {
    maxBodyLength: Infinity,
    headers: {
      Accept: "application/vnd.connect.v1+json",
    },
  });
  const data = await response.data;
  return data;
};

// GET CLIENT BY ID REQUEST
export const GetClientByIdRequest = async (clientID :any) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/clients/${clientID}`,
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

// CREATE NEW CLIENT REQUEST
export const CreateClientRequest = async (body: any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/clients`, body, {
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

// EDIT CLIENT REQUEST
export const EditClientRequest = async (editClientID: any, body: any) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/clients/${editClientID}`,
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

// DELETE CLIENT  REQUEST
export const DeleteClientRequest = async (deleteClientID: any) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/clients/${deleteClientID}`,
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






