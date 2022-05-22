import { VideoTypes } from "../interfaces";

const Video = ({ id, link, classNumber }: VideoTypes) => {
  return (
    <div className={`iframe-position-${classNumber}`}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${link}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
