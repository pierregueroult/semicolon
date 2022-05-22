import axios from "axios";
import { useState, useEffect } from "react";
import { VideosTypes, VideoTypes } from "../interfaces";
import urls from "../path.json";
import Video from "./Video";

const Videos = ({ id, title }: { id: number; title: string }) => {
  const [order, setOrder] = useState([1, 2, 3, 4, 5]);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    axios
      .get(`${urls.serverPath}/fetch/video?count=${order.length}`)
      .then(res => setVideos(res.data));
  }, []);

  const mixOrderPlus = (): void => {
    let newOrder = [...order];
    newOrder.unshift(newOrder.pop());
    setOrder(newOrder);
  };
  const mixOrderMinus = (): void => {
    let newOrder = [...order];
    let el = newOrder.shift();
    newOrder.push(el);
    setOrder(newOrder);
  };

  return (
    <div
      className="videos"
      id={`homeSection-${id}`}
    >
      <h2 className="videos__title">{title}</h2>
      <div className="videos__content">
        <div
          className="home__section__navigation"
          onClick={() => mixOrderMinus()}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="videos__container">
          {videos !== null
            ? videos.map(({ id, link }: VideoTypes, i: number) => (
                <Video
                  id={id}
                  link={link}
                  classNumber={order[i]}
                  key={i + 1}
                />
              ))
            : ""}
        </div>
        <div
          className="home__section__navigation"
          onClick={() => mixOrderPlus()}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default Videos;
