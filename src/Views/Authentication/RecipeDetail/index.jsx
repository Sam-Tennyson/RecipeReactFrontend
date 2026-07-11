import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Row, Col, Card, Container, Image, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUser,
  faUtensils,
  faList,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

// Components
import CommonHeader from "../../../Components/Atoms/CommonHeader";
import ReadMore from "../../../Components/Atoms/ReadMore";
import RecipeComment from "./components/RecipeComment";

// Utils & Redux
import { useQuery } from "../../../Shared/Utilities";
import { getRecipeById } from "../../../Redux/Actions/Recipe";

// Styles
import "./style.scss";

const RecipeDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const recipeCategoryRed = useSelector((state) => state.recipe.category);
  const token = useSelector((state) => state.auth.token);
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    dispatch(
      getRecipeById({
        id: query.get("id"),
        success: (data) => setRecipeData(data),
      })
    );
  }, []);

  const categoryName = recipeCategoryRed?.find(
    (item) => item?._id === recipeData?.category
  )?.name;

  return (
    <>
      <CommonHeader
        title={recipeData?.title}
        handleBack={() =>
          navigate({
            pathname: query.get("action_back"),
          })
        }
      />

      <Container className="py-4">
        <Row>
          {/* Left: Image */}
          <Col md={8}>
            <Card className="mb-4 shadow-sm border rounded-4">
              {recipeData?.image ? (
                <Image
                  src={recipeData.image}
                  fluid
                  rounded
                  className="recipe-detail-img"
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center bg-light text-muted rounded-4 p-5 text-center">
                  <h5>No image available</h5>
                </div>
              )}
            </Card>
          </Col>

          {/* Right: Info */}
          <Col md={4}>
            <Card className="mb-4 shadow-sm border rounded-4 p-3">
              <h5 className="fw-bold">{recipeData?.title}</h5>
              <p className="text-muted mb-2">
                <FontAwesomeIcon icon={faCalendar} className="me-2" />
                {moment(recipeData?.created_at).format("LL")}
              </p>
              <p className="text-muted mb-2">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Created by {recipeData?.userId?.name}
              </p>
              {categoryName && (
                <p className="text-muted">
                  <FontAwesomeIcon icon={faTag} className="me-2" />
                  {categoryName}
                </p>
              )}
            </Card>
          </Col>
        </Row>

        {/* Description */}
        <Card className="mb-4 shadow-sm border rounded-4 p-3">
          <h6 className="fw-semibold mb-2">
            <FontAwesomeIcon icon={faList} className="me-2" />
            Description
          </h6>
          <ReadMore content={recipeData?.description} count_ref={800} />
        </Card>

        {/* Ingredients & Directions */}
        <Row>
          <Col md={6}>
            <Card className="mb-4 shadow-sm border rounded-4 p-3">
              <h6 className="fw-semibold mb-2">
                <FontAwesomeIcon icon={faUtensils} className="me-2" />
                Ingredients
              </h6>
              <p>{recipeData?.ingredients}</p>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 shadow-sm border rounded-4 p-3">
              <h6 className="fw-semibold mb-2">
                <FontAwesomeIcon icon={faList} className="me-2" />
                Directions
              </h6>
              <p>{recipeData?.directions}</p>
            </Card>
          </Col>
        </Row>

        {/* Comments */}
        <RecipeComment />
      </Container>
    </>
  );
};

export default RecipeDetail;
