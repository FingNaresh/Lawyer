export const BOOK_APPOINTMENT = "BOOK_APPOINTMENT";
export const LOAD_LAWYERS = "LOAD_LAWYERS";
export const VIEW_HISTORY = "VIEW_HISTORY";


export const bookAppointment = (appointment) => ({
  type: BOOK_APPOINTMENT,
  payload: appointment,
});

export const loadLawyers = (lawyers) => ({
  type: LOAD_LAWYERS,
  payload: lawyers,
});

export const viewHistory = (lawyerName) => ({
  type: VIEW_HISTORY,
  payload: lawyerName,
});
