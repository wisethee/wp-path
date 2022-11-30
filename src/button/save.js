import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 */
const Save = (props) => {
  return (
    <a
      {...useBlockProps.save()}
      href={props.attributes.linkObject.url}
      className={`yana-button is-${props.attributes.config}`}
    >
      <span>{props.attributes.text}</span>
      <svg width="13px" height="10px" viewBox="0 0 13 10">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </a>
  );
};

export default Save;
