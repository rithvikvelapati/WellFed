import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isModalOpen: boolean;
  isEditDetailsModalOpen: boolean;
  isInviteModalOpen: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
  isEditDetailsModalOpen: false,
  isInviteModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    setInviteModalOpen(state, action) {
      state.isInviteModalOpen = action.payload;
    },
    setEditDetailsModalOpen(state, action) {
      state.isEditDetailsModalOpen = action.payload;
    },
  },
});

export const { setModalOpen, setInviteModalOpen, setEditDetailsModalOpen } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
