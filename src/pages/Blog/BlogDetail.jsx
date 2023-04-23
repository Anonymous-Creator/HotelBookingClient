import Title from "../../components/Title";
import Introduction from "../../components/About-us/Introduction";
import Header from "../../components/Header";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { fetchGetPost } from "../../store/postSlice/postSlice";

const BlogDetail = () => {
  let { blogId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [blog, setBlog] = useState({});

  useEffect(() => {
    (async () => {
      const result = await dispatch(fetchGetPost(blogId))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          if (originalPromiseResult.data) {
            setBlog(originalPromiseResult.data);
            console.log(originalPromiseResult.data);
          }
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
          // handle result here
        });
    })();

    // return () => {}; // no-op
  }, [blogId]);

  return (
    <div>
      <Header />
      {/* Blog Details Hero Section Begin */}
      <section
        className="blog-details-hero set-bg"
        style={{ height: "max-content", paddingTop: "0" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="bd-hero-text">
                <span>Hotel Booking</span>
                <h2 style={{ color: "black" }}>{blog && blog.title}</h2>
                <ul>
                  <li className="b-time">
                    <i className="icon_clock_alt" />
                    {blog && blog.createdDate}
                  </li>
                  <li>
                    <i className="icon_profile" />
                    {blog &&
                      blog.createdBy?.firstName.concat(
                        " " + blog.createdBy.lastName
                      )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-details-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="blog-details-text">
                <div className="bd-title">
                  <p></p>
                </div>
                <div className="bd-pic">
                  {blog &&
                    blog.medias &&
                    blog.medias.map((media) => {
                      return (
                        <div className="bp-item">
                          <img src={media.url} alt="" />
                        </div>
                      );
                    })}
                </div>
                <div className="bd-more-text">
                  <div className="bm-item">
                    <h4>Hotel Booking</h4>
                    <p>{blog && blog.content}</p>
                  </div>
                </div>
                <div className="tag-share">
                  <div className="tags">
                    <a href="#">Travel Trip</a>
                    <a href="#">Camping</a>
                    <a href="#">Event</a>
                  </div>
                  <div className="social-share">
                    <span>Share:</span>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa fa-tripadvisor" />
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fa fa-youtube-play" />
                    </a>
                  </div>
                </div>
                {/* <div className="comment-option">
                  <h4>2 Comments</h4>
                  <div className="single-comment-item first-comment">
                    <div className="sc-author">
                      <img src={blog.createdBy?.avatar} alt="" />
                    </div>
                    <div className="sc-text">
                      <span>27 Aug 2019</span>
                      <h5>{blog.createdBy?.firstName}</h5>
                      <p>
                        Neque porro qui squam est, qui dolorem ipsum quia dolor
                        sit amet, consectetur, adipisci velit, sed quia non
                        numquam eius modi tempora. incidunt ut labore et dolore
                        magnam.
                      </p>
                      <a href="#" className="comment-btn">
                        Like
                      </a>
                      <a href="#" className="comment-btn">
                        Reply
                      </a>
                    </div>
                  </div>
                  <div className="single-comment-item reply-comment">
                    <div className="sc-author">
                      <img src={blog.createdBy?.avatar} alt="" />
                    </div>
                    <div className="sc-text">
                      <span>27 Aug 2019</span>
                      <h5>
                        {Object.keys(user).length > 0 &&
                          user.lastName.concat(" " + user.firstName)}
                      </h5>
                      <p>
                        Neque porro qui squam est, qui dolorem ipsum quia dolor
                        sit amet, consectetur, adipisci velit, sed quia non
                        numquam eius modi tempora. incidunt ut labore et dolore
                        magnam.
                      </p>
                      <a href="#" className="comment-btn like-btn">
                        Like
                      </a>
                      <a href="#" className="comment-btn reply-btn">
                        Reply
                      </a>
                    </div>
                  </div>
                  <div className="single-comment-item second-comment ">
                    <div className="sc-author">
                      <img src={blog.createdBy?.avatar} alt="" />
                    </div>
                    <div className="sc-text">
                      <span>27 Aug 2019</span>
                      <h5>Brandon Kelley</h5>
                      <p>
                        Neque porro qui squam est, qui dolorem ipsum quia dolor
                        sit amet, consectetur, adipisci velit, sed quia non
                        numquam eius modi tempora. incidunt ut labore et dolore
                        magnam.
                      </p>
                      <a href="#" className="comment-btn">
                        Like
                      </a>
                      <a href="#" className="comment-btn">
                        Reply
                      </a>
                    </div>
                  </div>
                </div>
                <div className="leave-comment">
                  <h4>Leave A Comment</h4>
                  <form action="#" className="comment-form">
                    <div className="row">
                      <div className="col-lg-6">
                        <input type="text" placeholder="Name" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" placeholder="Email" />
                      </div>
                      <div className="col-lg-12 text-center">
                        <input type="text" placeholder="Website" />
                        <textarea placeholder="Messages" defaultValue={""} />
                        <button type="submit" className="site-btn">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Details Section End */}
      {/* Recommend Blog Section Begin */}
      <section className="recommend-blog-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Recommended</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div
                className="blog-item set-bg"
                data-setbg="img/blog/blog-1.jpg"
              >
                <div className="bi-text">
                  <span className="b-tag">Travel Trip</span>
                  <h4>
                    <a href="#">Tremblant In Canada</a>
                  </h4>
                  <div className="b-time">
                    <i className="icon_clock_alt" /> 15th April, 2019
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="blog-item set-bg"
                data-setbg="img/blog/blog-2.jpg"
              >
                <div className="bi-text">
                  <span className="b-tag">Camping</span>
                  <h4>
                    <a href="#">Choosing A Static Caravan</a>
                  </h4>
                  <div className="b-time">
                    <i className="icon_clock_alt" /> 15th April, 2019
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="blog-item set-bg"
                data-setbg="img/blog/blog-3.jpg"
              >
                <div className="bi-text">
                  <span className="b-tag">Event</span>
                  <h4>
                    <a href="#">Copper Canyon</a>
                  </h4>
                  <div className="b-time">
                    <i className="icon_clock_alt" /> 21th April, 2019
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Recommend Blog Section End */}
    </div>
  );
};

export default BlogDetail;
