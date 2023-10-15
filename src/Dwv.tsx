import { App } from "dwv";
import { useEffect, useRef } from "react";

const Dwv: React.FC = () => {
  const viewerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize the DWV application
    const app = new App();

    // If 'App' method 'init' has known parameters, specify them. Otherwise, you might use any.
    const appOptions: any = {
        containerDivId: "dwv",
        tools: ["Scroll", "ZoomAndPan"],
        isMobile: false
        };

          
    app.init(appOptions);

    // Sample DICOM stack URLs. Replace these with the paths to your DICOM files.
    const stackUrls = [
      "path/to/slice1.dcm",
      "path/to/slice2.dcm",
      "path/to/slice3.dcm"
      // Add more slices as needed
    ];

    app.loadURLs(stackUrls);

    // Cleanup on component unmount
    // return () => app.destroy();
  }, []);

  return (
    <div
      ref={viewerRef}
      id="dwv"
      style={{ width: "512px", height: "512px", border: "1px solid red" }}
    >
      <div className="layerContainer">
        <canvas className="imageLayer">
          Only for HTML5 compatible browsers...
        </canvas>
      </div>
    </div>
  );
};

export default Dwv;
