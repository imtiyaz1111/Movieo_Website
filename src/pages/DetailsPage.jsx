import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import useFetch from "../hooks/useFetch";
import useFetchDetails from "../hooks/useFetchDetails";

import Divider from "../components/Divider";
import HorizontalScollCard from "../components/HorizontalScollCard";
import VideoPlay from "../components/VideoPlay";
import { toast } from "react-toastify";

const DetailsPage = () => {
  const auth = useSelector((state) => state.auth);
  const { explore, id } = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);

  const { data } = useFetchDetails(`/${explore}/${id}`);
  const { data: castData } = useFetchDetails(`/${explore}/${id}/credits`);
  const { data: similarData } = useFetch(`/${explore}/${id}/similar`);
  const { data: recommendationData } = useFetch(
    `/${explore}/${id}/recommendations`
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = () => {
    if (auth?.token == "") {
      toast.error("Please login to Play Video.");
    } else {
      setPlayVideoId(data);
      setPlayVideo(true);
    }
  };

  const duration = data?.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : "";

  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name)
    ?.join(", ");

  return (
    <div>
      {/* Backdrop Image */}
      {data?.backdrop_path && (
        <div className="w-full h-[280px] relative hidden lg:block">
          <img
            src={imageURL + data.backdrop_path}
            className="w-full h-full object-cover"
            alt="Backdrop"
          />
          <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        {/* Poster + Button */}
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data?.poster_path}
            className="h-80 w-60 object-cover rounded"
            alt="Poster"
          />
          <button
            onClick={handlePlayVideo}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>

        {/* Details */}
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>

          <Divider />

          <div className="flex items-center gap-3">
            <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>Views: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>Duration: {duration}</p>
          </div>

          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>
                Release: {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Revenue: ${Number(data?.revenue).toLocaleString()}</p>
            </div>
            <Divider />
          </div>

          {/* Director & Writer */}
          <div>
            <p>
              <span className="text-white">Director:</span>{" "}
              {castData?.crew?.find((el) => el.job === "Director")?.name ||
                "N/A"}
            </p>
            <Divider />
            <p>
              <span className="text-white">Writer:</span> {writer || "N/A"}
            </p>
          </div>

          <Divider />

          {/* Cast Section */}
          <h2 className="font-bold text-lg">Cast:</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              ?.map((starCast, index) => (
                <div key={starCast.id || index} className="text-center">
                  <img
                    src={imageURL + starCast.profile_path}
                    alt={starCast.name}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <p className="font-bold text-sm text-neutral-400">
                    {starCast.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Similar and Recommendations */}
      <HorizontalScollCard
        data={similarData}
        heading={`Similar ${explore}`}
        media_type={explore}
      />
      <HorizontalScollCard
        data={recommendationData}
        heading={`Recommendation ${explore}`}
        media_type={explore}
      />

      {/* Video Modal */}
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={explore}
        />
      )}
    </div>
  );
};

export default DetailsPage;
