import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import { SpinnerLoader } from "../components/spinner/spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AccordionComponent } from "../components/Accordian";
import { ButtonComponent } from "../components/ButtonComponent";

const LossPreview = () => {
  const [preview, setPreview] = useState([{ sample: "sample" }]);
  const [imgAndVideo, setImgAndVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id, SubmissionId } = useLocation().state;
  const navigate = useNavigate();

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    try {
      setLoading(true);
      let { data } = await axiosInstance.post("getRecordById", {
        id: id,
        SubmissionId: SubmissionId,
      });
      let response = await axiosInstance.post("getRecordById", {
        ReqType: "Img",
        SubmissionId: SubmissionId,
      });
      if (data.code !== 200) return setLoading(false);
      setPreview(data.data);
      setImgAndVideos(response?.data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }; // fetch data from api - getRecordById

  const handleBack = (obj) => {
    navigate(-1);
  };

  const images = imgAndVideo.filter((record) => record.Url?.includes("getImage") == true);
  const videos = imgAndVideo.filter((record) => record.Url?.includes("getVideo") == true);

  return (
    <div className="m-3">
      <SpinnerLoader isLoading={loading} />
      <Row>
        <Col md={2}>
          <ButtonComponent name={"Back"} onClick={handleBack} color={"#25A813"} />
        </Col>
      </Row>
      <AccordionComponent className="mt-3" title={"Preview Deails"}>
        <Card className="my-4 p-4">
          {Object.entries(preview[0]).map(([key, value], index) => (
            <Row key={index} className="mb-2">
              <Col xs={4} className="text-capitalize fw-bold">
                {key}:
              </Col>
              <Col xs={8}>{!value ? "N/A" : value.toString()}</Col>
            </Row>
          ))}
        </Card>
      </AccordionComponent>
      <AccordionComponent
        className="mt-3"
        title={"Imaages And Video"}
      >
        <Row>
          {/* Left side: Images */}
          <Col md={6}>
            <h4>Images</h4>
            {images.map((image) => (
              <div key={image.id} className="mb-3">
                <p>Image ID: {image.id}</p>
                <Image src={image.Url} fluid alt={`Image-${image.id}`} />
                {image.OfficerPhoto !== "yes" ? (
                  <>
                    <span>Longitude: {image.Longitude}</span>
                    <p>Latitude: {image.Latitude}</p>
                  </>
                ) : (
                  <p>Officers Photo</p>
                )}
              </div>
            ))}
          </Col>

          {/* Right side: Videos */}
          <Col md={6}>
            <h4>Videos</h4>
            {videos.map((video) => (
              <div key={video.id} className="mb-3">
                <p>Video ID: {video.id}</p>
                <video controls width="100%">
                  <source src={video.Url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </Col>
        </Row>
      </AccordionComponent>
    </div>
  );
};

export default LossPreview;
