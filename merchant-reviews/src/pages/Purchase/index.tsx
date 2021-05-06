import React from 'react';
import Header from "@/components/Header"
import PurchaseForm from "./components/PurchaseForm"
import Tip from "@/components/Tip"

const index = () => {
    const handleBack = () => {
        history.back();
    }
    
    const handleCloseTip = () => {
    
    }
    return (
        <div>
        <Header title="下单" onBack={handleBack}/>
        <PurchaseForm/>
        <Tip message="购买成功！" onClose={handleCloseTip} />
      </div>
    );
};

export default index;