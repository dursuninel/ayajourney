import React, { useEffect, useState } from "react";

import PageBanner from "../components/PageBanner";
import TiltBox from "../components/TiltBox";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

export default function BlogDetail() {
  const { link } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`/webBlog/${link}`).then((response) => {
      if (response.data === "") {
        navigate("/visa/blog");
      } else {
        setData(response.data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      <PageBanner title={data.title} />

      <section>
        <div className="container">
          {loading && <Loader position={"fixed"} />}
          {!loading && (
            <div className="blog-detail-content">
              <img src={data.image} alt={data.title} />
              <div
                className="mt-2"
                style={{
                  textAlign: "end",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {new Date(data.date).toLocaleDateString("tr-TR")}
              </div>
              <div
                className="mt-3 blog-detail-text"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
