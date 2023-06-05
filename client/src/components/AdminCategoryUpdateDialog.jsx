import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const AdminCategoryUpdateDialog = ({
  visible,
  onClose,
  categoryTitle,
  categoryLabel,
  categoryDescription,
}) => {
  const [showCategoryTitle, setShowCategoryTitle] = useState(false);
  const [showCategoryLabel, setShowCategoryLabel] = useState(false);
  const [showCategoryDescription, setShowCategoryDescription] = useState(false);
  const [showNoCategory, setShowNoCategory] = useState(false)

  // hiding the modal
  const handleClose = (e) => {
    if (e.target.id === "Container") {
      onClose();
    }
  };

  useEffect(() => {
    if (categoryTitle) {
      setShowCategoryTitle(true);
    }
    if (categoryLabel) {
      setShowCategoryLabel(true);
    }
    if (categoryDescription) {
        setShowCategoryDescription(true);
    }
    if (!categoryTitle &&!categoryLabel &&!categoryDescription) {
      setShowNoCategory(true);
    }
  }, []);

  if (!visible) {
    return null;
  } else {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="light"
        />
        <div
          onClick={handleClose}
          id="Container"
          className="fixed inset-0 bg-black z-10 bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        >
          <form
            method=""
            className="bg-white text-black  p-7 rounded flex flex-col"
          >
            {showCategoryTitle && (
              <input type="text" placeholder="New Category Title" />
            )}
            {showCategoryLabel && (
              <input type="text" placeholder="New Category Label" />
            )}
            {showCategoryDescription && (
              <input type="text" placeholder="New Category Description" />
            )}
            {showNoCategory && <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-teal-600 select-none"> YOU HAV'NT SELECTED ANY CATEGORY TO BE UPDATED </h1>}
          </form>
        </div>
      </>
    );
  }
};
export default AdminCategoryUpdateDialog;
