import React from "react";
import EditDetailsModal from "@/components/EventCalender/EditDetailsModal";

const MealEditOverlayPage: React.FC = () => {

    return (
        <EditDetailsModal isModalOpen={false} handleModalClose={function (): void {
            throw new Error("Function not implemented.");
        } }/>
    );
};

export default MealEditOverlayPage;
