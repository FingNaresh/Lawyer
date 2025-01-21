import { BOOK_APPOINTMENT, LOAD_LAWYERS, VIEW_HISTORY } from './actions';

const initialState = {
  lawyers: [],
  appointments: [],
  appointmentHistory: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LAWYERS:
      return { ...state, lawyers: action.payload };
    case BOOK_APPOINTMENT:
      const updatedLawyers = state.lawyers.map(lawyer => {
        if (lawyer.name === action.payload.lawyerName) {
          return {
            ...lawyer,
            availableSlots: lawyer.availableSlots - 1
          };
        }
        return lawyer;
      });
      return { 
        ...state, 
        lawyers: updatedLawyers,
        appointments: [...state.appointments, action.payload] 
      };
    case VIEW_HISTORY:
      return { 
        ...state, 
        appointmentHistory: state.appointments.filter(
          (appointment) => appointment.lawyerName === action.payload
        ) 
      };
    default:
      return state;
  }
};

export default reducer;
