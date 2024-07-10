import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching emails
export const fetchEmails = createAsyncThunk(
  "mailbox/fetchEmails",
  async (email, { rejectWithValue }) => {
    const userEmail = email.substring(0, email.indexOf("@"));
    try {
      const response = await axios.get(
        `https://satiya-585fe-default-rtdb.firebaseio.com/mail/${userEmail}/receivedMail.json`
      );
      const data = response.data;
      const loadedEmails = [];
      for (const key in data) {
        loadedEmails.push({ id: key, ...data[key] });
      }
      return loadedEmails;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSentMessage = createAsyncThunk(
  "mailbox/fetchSentMessage",
  async ({ email, id, type }, { rejectWithValue }) => {
    const userEmail = email.substring(0, email.indexOf("@"));
    try {
      const response = await axios.get(
        `https://satiya-585fe-default-rtdb.firebaseio.com/mail/${userEmail}/${type}/${id}.json`
      );
      const data = response.data;
      console.log(data);
      if (type == "receivedMail") {
        updateEmailReadStatus({ email, id, readStatus: true });
        console.log("Hello");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSentEmails = createAsyncThunk(
  "mailbox/fetchSentEmails",
  async (email, { rejectWithValue }) => {
    const userEmail = email.substring(0, email.indexOf("@"));
    try {
      const response = await axios.get(
        `https://satiya-585fe-default-rtdb.firebaseio.com/mail/${userEmail}/sentMail.json`
      );
      const data = response.data;

      const loadedEmails = [];
      for (const key in data) {
        loadedEmails.push({ id: key, ...data[key] });
      }
      return loadedEmails;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Sending an email
export const sendEmail = createAsyncThunk(
  "mailbox/sendEmail",
  async ({ senderEmail, emailData }, { rejectWithValue }) => {
    console.log(senderEmail, emailData);
    if (!senderEmail || !emailData.reciver) {
      return rejectWithValue("Sender or receiver email is missing");
    }

    const senderUserEmail = senderEmail.substring(0, senderEmail.indexOf("@"));
    const receiverEmail = emailData.reciver;
    const receiverUserEmail = receiverEmail.substring(
      0,
      receiverEmail.indexOf("@")
    );

    try {
      // Store the email in the sender's sentMail folder
      const senderResponse = await axios.post(
        `https://satiya-585fe-default-rtdb.firebaseio.com/mail/${senderUserEmail}/sentMail.json`,
        emailData
      );

      // Store the email in the receiver's receivedMail folder
      const receiverResponse = await axios.post(
        `https://satiya-585fe-default-rtdb.firebaseio.com/mail/${receiverUserEmail}/receivedMail.json`,
        { ...emailData, read: false } // Assuming the email is unread initially
      );

      return { id: senderResponse.data.name, ...emailData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Deleting an email
export const deleteEmail = createAsyncThunk(
  "mailbox/deleteEmail",
  async ({ email, id, isSent }, { rejectWithValue }) => {
    const userEmail = email.substring(0, email.indexOf("@"));
    const folder = isSent ? "sentMail" : "receivedMail";
    try {
      await axios.delete(
        `https://satiya-585fe-default-rtdb.firebaseio.com/mail/${userEmail}/${folder}/${id}.json`
      );
      return { id, isSent };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Updating email read status
export const updateEmailReadStatus = createAsyncThunk(
  "mailbox/updateEmailReadStatus",
  async ({ email, id, readStatus }, { rejectWithValue }) => {
    const userEmail = email.substring(0, email.indexOf("@"));

    try {
      const data = await axios.patch(
        `https://satiya-585fe-default-rtdb.firebaseio.com/mail/${userEmail}/receivedMail/${id}.json`,
        { read: readStatus }
      );

      return { id, read: readStatus };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const mailboxSlice = createSlice({
  name: "mailbox",
  initialState: {
    receivedEmails: [],
    sentEmails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedEmails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSentEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.sentEmails = action.payload;
      })
      .addCase(fetchSentEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.sentEmails.push(action.payload);
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmail.fulfilled, (state, action) => {
        state.loading = false;
        const { id, isSent } = action.payload;
        if (isSent) {
          state.sentEmails = state.sentEmails.filter(
            (email) => email.id !== id
          );
        } else {
          state.receivedEmails = state.receivedEmails.filter(
            (email) => email.id !== id
          );
        }
      })
      .addCase(deleteEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSentMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentMessage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchSentMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmailReadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmailReadStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id, read } = action.payload;
        const email = state.receivedEmails.find((email) => email.id === id);
        if (email) {
          email.read = read;
        }
      })
      .addCase(updateEmailReadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mailboxSlice.reducer;
