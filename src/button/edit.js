import { link } from "@wordpress/icons";
import { useBlockProps } from "@wordpress/block-editor";
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
} from "@wordpress/components";
import {
  RichText,
  BlockControls,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { useState } from "@wordpress/element";

import "./style.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 */
const Edit = (props) => {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

  function handleTextChange(text) {
    props.setAttributes({ text });
  }

  function buttonHandler() {
    setIsLinkPickerVisible((prev) => !prev);
  }

  function buttonHandlerPrimary() {
    props.setAttributes({ config: "primary" });
    console.log(props.attributes);
  }

  function buttonHandlerSecondary() {
    props.setAttributes({ config: "secondary" });
  }

  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink });
  }

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton onClick={buttonHandler} icon={link} />
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton
            isPressed={props.attributes.config === "primary"}
            onClick={buttonHandlerPrimary}
            label="Primary"
          >
            Primary
          </ToolbarButton>
          <ToolbarButton
            isPressed={props.attributes.config === "secondary"}
            onClick={buttonHandlerSecondary}
            label="Secondary"
          >
            Secondary
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>

      <div className={`path-button is-${props.attributes.config}`}>
        <RichText
          {...useBlockProps()}
          allowedFormats={[]}
          tagName="span"
          value={props.attributes.text}
          onChange={handleTextChange}
          placeholder="Button"
        />

        <svg width="13px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </div>

      {isLinkPickerVisible && (
        <Popover position="middle center">
          <LinkControl
            settings={[]}
            value={props.attributes.linkObject}
            onChange={handleLinkChange}
          />

          <Button
            variant="primary"
            onClick={() => setIsLinkPickerVisible(false)}
            style={{ display: "block", width: "100%" }}
          >
            Confirm Link
          </Button>
        </Popover>
      )}
    </>
  );
};

export default Edit;
