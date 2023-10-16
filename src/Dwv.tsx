import { App,ViewConfig,AppOptions} from "dwv";
import { useEffect, useRef } from "react";
import stackUrls from "./dummydata"

const Dwv: React.FC = () => {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const app = new App();
    // initialise
    const viewConfig0 = new ViewConfig('layerGroup0');
    const viewConfigs = {'*': [viewConfig0]};
    const options = new AppOptions(viewConfigs);
    app.init(options);
    //load urls
    app.loadURLs(stackUrls);

    return () => app.reset();

  }, []);

  return (
    <div  ref={viewerRef}>
      <div

      id="layerGroup0"
      style={{ width: "600px", height: "600px", border: "1px solid red" }}
    >
    </div>
    </div>
    
  );
};

export default Dwv;
