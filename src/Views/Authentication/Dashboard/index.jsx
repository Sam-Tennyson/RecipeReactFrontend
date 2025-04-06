// libs
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

// components
import CommonRecipeCard from "../../../Components/Atoms/CommonRecipeCard";
import ReactPagination from "../../../Components/Atoms/ReactPaginate";
import CommonSearch from "../../../Components/Atoms/CommonSearch";

// actions
import { getRecipe } from "../../../Redux/Actions/Recipe";

// utils
import { ERROR_MESSAGE, STRING_NUMBER } from "../../../Shared/Constants";
import { errorSnackbar } from "../../../Shared/Utilities";
import { ROUTE_CONSTANTS } from "../../../Shared/Routes";
import ReactRecipeSkelton from "../../../Components/Atoms/ReactRecipeSkelton";
import useLoader from "../../../hooks/useLoader";

const Dashboard = () => {
  const { hideLoader, loading, showLoader } = useLoader();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const oneTimeCall = useRef(false);
  const skipRef = useRef(STRING_NUMBER?.ZERO);
  const limitRef = useRef(STRING_NUMBER?.TWELVE);
  const currentPageRef = useRef(STRING_NUMBER?.ZERO);
  const rowPerPageRef = useRef(STRING_NUMBER?.TWELVE);

  const recipeDataRed = useSelector(
    (state) => state?.recipe?.recipe_data?.recipeData
  );
  const recipeDataRedCount = useSelector(
    (state) => state?.recipe?.recipe_data?.totalCount
  );

  const [search, setSearch] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  const getRecipeData = () => {
    showLoader();
    dispatch(
      getRecipe({
        searchKey: search,
        category: { category: categoryData },
        limit: limitRef.current,
        skip: skipRef.current,
        fail: (msg) => {
          let errMsg = msg || ERROR_MESSAGE?.SOMETHING_WENT_WRONG;
          enqueueSnackbar(errMsg, errorSnackbar);
        },
      })
    );
    hideLoader();
  };

  const handlePageClick = ({ selected }) => {
    skipRef.current = rowPerPageRef.current * selected;
    getRecipeData();
  };

  const handleClick = (data) => {
    navigate({
      pathname: ROUTE_CONSTANTS.RECIPE_DETAIL,
      search: `?id=${data._id}&action_back=${ROUTE_CONSTANTS.DASHBOARD}`,
    });
  };

  useEffect(() => {
    let time_rec = setTimeout(() => {
      getRecipeData();
    }, 500);
    return () => clearTimeout(time_rec);
  }, [categoryData, search]);

  const renderRecipeData = () => {
    if (recipeDataRed?.length === 0) {
      return <div className="text-center">No Recipe Found</div>;
    } else if (recipeDataRed?.length > 0) {
      return (
        <>
          {recipeDataRed?.map((recipe, index) => (
            <div className="my-2 col-sm-6 col-md-6 col-lg-4" key={recipe?._id}>
              <CommonRecipeCard
                data={recipe}
                handleClick={() => handleClick(recipe)}
              />
            </div>
          ))}
          <ReactPagination
            rowsPerPage={rowPerPageRef.current}
            activePage={currentPageRef.current}
            totalCount={recipeDataRedCount}
            onPageChange={handlePageClick}
          />
        </>
      );
    } else {
      return <ReactRecipeSkelton />;
    }
  };

  return (
    <>
      <CommonSearch
        setSearch={setSearch}
        search={search}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
        totalRecipeCount={recipeDataRedCount}
      />
      <div className="row my-3">{renderRecipeData()}</div>
    </>
  );
};

export default Dashboard;
