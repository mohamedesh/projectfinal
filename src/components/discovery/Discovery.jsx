import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscoveryRessources } from "../../redux/reducers/ressource.slice";

const Discovery = () => {
  const dispatch = useDispatch();
  const { shareRessources } = useSelector((store) => store.ressource);
  console.log(shareRessources);

  useEffect(() => {
    dispatch(getDiscoveryRessources());
  }, []);

  return (
    <div>
      {shareRessources.map((share) => (
        <>
          {console.log(share)}
          <h1>{share.title}</h1>
        </>
      ))}
    </div>
  );
};

export default Discovery;
