import { App, ViewConfig, AppOptions, ToolConfig } from "dwv";
import { useEffect, useRef, useState } from "react";
import stackUrls from "./dummydata";
import ZoomIcon from "@mui/icons-material/Search";
import ScrollIcon from "@mui/icons-material/MoveDown";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import RulerIcon from "@mui/icons-material/Straighten";

type toolsType = "Scroll" | "ZoomAndPan" | "Draw";

const Dwv: React.FC = () => {
  const viewerRef = useRef<any>(null);
  const [tools, setTools] = useState<toolsType>("Scroll");
  const appRef = useRef<any>(null);

  useEffect(() => {
    appRef.current = new App();
    // initialise
    const viewConfig0 = new ViewConfig("layerGroup0");
    const viewConfigs = { "*": [viewConfig0] };
    const options = new AppOptions(viewConfigs);
    options.tools = {
      ZoomAndPan: new ToolConfig(),
      Scroll: new ToolConfig(),
      WindowLevel: new ToolConfig(),
      Draw: {
        options: ["Ruler"],
      },
    };

    appRef.current.init(options);

    //load urls
    appRef.current.loadURLs(stackUrls);

    appRef.current.addEventListener("load", function () {
      appRef.current.setTool("Scroll");
    });

    return () => appRef.current.reset();
  }, []);

  const handleToolChange = (
    event: React.MouseEvent<HTMLElement>,
    newTool: toolsType
  ) => {
    if (appRef.current) {
      setTools(newTool);
      appRef.current.setTool(newTool);
      if (newTool === "Draw") {
        onChangeShape("Ruler");
      }
    }
  };

  const onChangeShape = (shape: String) => {
    if (appRef.current) {
      appRef.current.setToolFeatures({ shapeName: shape });
    }
  };
  return (
    <>
      <div>
        <ToggleButtonGroup
          size="small"
          exclusive
          onChange={handleToolChange}
          value={tools}
        >
          <ToggleButton value="ZoomAndPan">
            <ZoomIcon />
          </ToggleButton>
          <ToggleButton value="Scroll">
            <ScrollIcon />
          </ToggleButton>
          <ToggleButton value="Draw">
            <RulerIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div ref={viewerRef}>
        <div id="layerGroup0" style={{ width: "600px", height: "600px" }}></div>
      </div>
    </>
  );
};

export default Dwv;
