import { App, ViewConfig, AppOptions, ToolConfig } from "dwv";
import { useEffect, useRef } from "react";
import stackUrls from "./dummydata";

const Dwv: React.FC = () => {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const app = new App();
    // initialise
    const viewConfig0 = new ViewConfig("layerGroup0");
    const viewConfigs = { "*": [viewConfig0] };
    const options = new AppOptions(viewConfigs);
    options.tools = {
      ZoomAndPan: new ToolConfig(),
      Scroll: new ToolConfig(),
    };

    app.init(options);
    //load urls
    app.loadURLs(stackUrls);

    app.addEventListener("load", function () {
      app.setTool("ZoomAndPan");
      app.setTool("Scroll");
    });

    return () => app.reset();
  }, []);

  return (
    <div ref={viewerRef}>
      <div
        id="layerGroup0"
        style={{ width: "600px", height: "600px", border: "1px solid red" }}
      ></div>
    </div>
  );
};

export default Dwv;
